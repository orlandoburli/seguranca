package br.com.orlandoburli.seguranca.resources.acesso;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.core.services.AbstractResource;
import br.com.orlandoburli.seguranca.core.services.CadastroResponse;
import br.com.orlandoburli.seguranca.core.services.annotations.UserSession;
import br.com.orlandoburli.seguranca.core.services.filters.annotations.AuthenticationRequired;
import br.com.orlandoburli.seguranca.model.geral.sessaousuario.SessaoUsuario;
import br.com.orlandoburli.seguranca.model.geral.sessaousuario.SessaoUsuarioService;

@Path("/ping")
public class PingResource extends AbstractResource {

	@Inject
	@UserSession
	private SessaoUsuario sessao;

	@Inject
	private SessaoUsuarioService sessaoUsuarioService;

	@GET
	@POST
	@AuthenticationRequired
	@Transactional
	public Response ping() {
		try {
			if (this.sessao != null) {
				this.sessaoUsuarioService.alive(this.sessao);

				CadastroResponse<SessaoUsuario> response = new CadastroResponse<>(null, true, null);

				return this.json().status(Response.Status.OK).entity(response).build();
			} else {
				CadastroResponse<SessaoUsuario> response = new CadastroResponse<>(null, false, "Sessão não encontrada");

				return this.json().status(Response.Status.OK).entity(response).build();
			}
		} catch (BusinessException e) {
			CadastroResponse<SessaoUsuario> response = new CadastroResponse<>(null, false, e.getMessage());

			return this.json().status(Response.Status.OK).entity(response).build();
		}
	}
}
