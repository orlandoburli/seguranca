package br.com.orlandoburli.seguranca.core.services.filters;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.ext.Provider;

import br.com.orlandoburli.seguranca.core.enuns.FormaLogoff;
import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.core.exceptions.ErrorField;
import br.com.orlandoburli.seguranca.core.services.ISessaoUsuarioService;
import br.com.orlandoburli.seguranca.core.services.filters.annotations.AuthenticationRequired;
import br.com.orlandoburli.seguranca.core.utils.CDIServiceLocator;
import br.com.orlandoburli.seguranca.core.utils.SegurancaUtils;
import br.com.orlandoburli.seguranca.core.vo.ISessaoUsuario;

@Provider
public class AuthenticationFilter implements ContainerRequestFilter {

	@Context
	private HttpServletRequest request;

	@Context
	private ResourceInfo resourceInfo;

	@Inject
	private ISessaoUsuarioService sessaoUsuarioService;

	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {

		if (this.resourceInfo != null) {
			return;
		}

		AuthenticationRequired authenticationRequired = this.resourceInfo.getResourceMethod().getAnnotation(AuthenticationRequired.class);

		// Não dá pra injetar, então usa o CDI Service Locator
		ISessaoUsuario sessaoUsuario = CDIServiceLocator.getBean(ISessaoUsuario.class);

		if (sessaoUsuario != null) {
			// Valida se a sessão é do mesmo IP

			String ipAddress = SegurancaUtils.getIpFromRequest(this.request);
			String computerName = SegurancaUtils.getComputerNameFromIP(ipAddress);

			if (!sessaoUsuario.getEnderecoIp().equals(ipAddress) || !sessaoUsuario.getHostName().equals(computerName)) {
				// Expirar a sessao
				try {
					this.sessaoUsuarioService.logoff(sessaoUsuario, FormaLogoff.HOST_DIFERENTE);

					ResponseBuilder builder = null;
					ErrorField response = new ErrorField("Sessão inválida!");
					builder = Response.status(Response.Status.UNAUTHORIZED).encoding("UTF-8").entity(response);
					throw new WebApplicationException(builder.build());
				} catch (BusinessException e) {
					e.printStackTrace();

					ResponseBuilder builder = null;
					ErrorField response = new ErrorField(e.getMessage());
					builder = Response.status(Response.Status.UNAUTHORIZED).encoding("UTF-8").entity(response);
					throw new WebApplicationException(builder.build());
				}
			}
			// Atualizar a sessao (data da ultima interacao)
			try {
				this.sessaoUsuarioService.alive(sessaoUsuario);
			} catch (BusinessException e) {
				e.printStackTrace();

				ResponseBuilder builder = null;
				ErrorField response = new ErrorField(e.getMessage());
				builder = Response.status(Response.Status.UNAUTHORIZED).encoding("UTF-8").entity(response);
				throw new WebApplicationException(builder.build());
			}
		}

		if (authenticationRequired != null) {
			// Valida se ele tem sessão, cookies, etc.
			if (sessaoUsuario == null) {
				ResponseBuilder builder = null;
				ErrorField response = new ErrorField("Autenticação requerida!");
				builder = Response.status(Response.Status.UNAUTHORIZED).encoding("UTF-8").entity(response);
				throw new WebApplicationException(builder.build());
			}
		}
	}
}