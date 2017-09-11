package br.com.orlandoburli.seguranca.resources.suporte;

import java.util.UUID;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import br.com.orlandoburli.seguranca.core.enuns.FormaLogoff;
import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.core.services.AbstractResource;
import br.com.orlandoburli.seguranca.model.geral.sessaousuario.SessaoUsuarioService;

@Path("/suporte")
@Stateless
public class MonitoramentoResource extends AbstractResource {

	@Inject
	private SessaoUsuarioService sessaoUsuarioService;

	@GET
	@Path("/usuarios-logados")
	public Response listarSessoes() {
		return this.json().status(Response.Status.OK).entity(this.sessaoUsuarioService.getAtivos()).build();
	}

	@POST
	@Path("/matar-sessao/{token}")
	public Response matarSessao(@PathParam("token") UUID token) {
		try {
			this.sessaoUsuarioService.logoff(this.sessaoUsuarioService.buscar(token), FormaLogoff.LOGOFF_FORCADO_SUPORTE);
			return this.text().status(Response.Status.OK).entity("OK").build();
		} catch (BusinessException e) {
			e.printStackTrace();
			return this.text().status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
		}
	}
}