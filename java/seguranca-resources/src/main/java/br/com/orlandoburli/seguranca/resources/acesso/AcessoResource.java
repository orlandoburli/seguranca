package br.com.orlandoburli.seguranca.resources.acesso;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.core.services.AbstractResource;
import br.com.orlandoburli.seguranca.core.services.CadastroResponse;
import br.com.orlandoburli.seguranca.model.acesso.usuario.LoginRequest;
import br.com.orlandoburli.seguranca.model.acesso.usuario.UsuarioService;
import br.com.orlandoburli.seguranca.model.geral.sessaousuario.SessaoUsuario;

@Path("/acesso")
@Stateless
public class AcessoResource extends AbstractResource {

	@Inject
	private UsuarioService usuarioBe;

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(LoginRequest request) {
		try {
			SessaoUsuario userSession = this.usuarioBe.entrar(request.getLogin(), request.getSenha(), request.getEmpresa());

			CadastroResponse<SessaoUsuario> response = new CadastroResponse<>(userSession, true, "Usuário autenticado com sucesso!");

			return this.json().entity(response).status(Status.OK).build();
		} catch (BusinessException e) {
			e.printStackTrace();

			CadastroResponse<SessaoUsuario> response = new CadastroResponse<>(null, false, e.getMessage());
			return this.json().entity(response).status(Status.OK).build();
		}
	}
}