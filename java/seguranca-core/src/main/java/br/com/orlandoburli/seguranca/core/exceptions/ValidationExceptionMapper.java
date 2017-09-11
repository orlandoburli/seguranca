package br.com.orlandoburli.seguranca.core.exceptions;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityNotFoundException;
import javax.validation.ConstraintDeclarationException;
import javax.validation.ConstraintDefinitionException;
import javax.validation.GroupDefinitionException;
import javax.validation.ValidationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.jboss.resteasy.api.validation.ViolationReport;

import br.com.orlandoburli.seguranca.core.services.CadastroResponse;

/**
 * {@link ExceptionMapper} for {@link ValidationException}.
 * <p>
 * Send a {@link ViolationReport} in {@link Response} in addition to HTTP
 * 400/500 status code. Supported media types are: {@code application/json} /
 * {@code application/xml} (if appropriate provider is registered on server).
 * </p>
 *
 * @see org.jboss.resteasy.api.validation.ResteasyViolationExceptionMapper The
 *      original WildFly class:
 *      {@code org.jboss.resteasy.api.validation.ResteasyViolationExceptionMapper}
 */
@Provider
public class ValidationExceptionMapper implements ExceptionMapper<Exception> {

	@Override
	public Response toResponse(Exception exception) {
		exception.printStackTrace();

		if (exception instanceof ConstraintDefinitionException) {
			return this.buildResponse(this.unwrapException(exception), Status.INTERNAL_SERVER_ERROR);
		}

		if (exception instanceof ConstraintDeclarationException) {
			return this.buildResponse(this.unwrapException(exception), Status.INTERNAL_SERVER_ERROR);
		}

		if (exception instanceof GroupDefinitionException) {
			return this.buildResponse(this.unwrapException(exception), Status.INTERNAL_SERVER_ERROR);
		}

		if (exception instanceof BusinessException) {
			return this.buildViolationReportResponse((BusinessException) exception, Status.INTERNAL_SERVER_ERROR);
		}

		if (exception instanceof EntityNotFoundException) {
			return this.buildViolationReportResponse(exception, Status.INTERNAL_SERVER_ERROR);
		}

		return this.buildResponse(this.unwrapException(exception), Status.INTERNAL_SERVER_ERROR);
	}

	private Response buildViolationReportResponse(BusinessException exception, Status status) {
		ResponseBuilder builder = Response.status(status);

		// Default media type.
		builder.type(MediaType.APPLICATION_JSON);
		builder.header("Access-Control-Allow-Origin", "*");

		builder.status(exception.getErrorHttp());

		builder.entity(new CadastroResponse<>(null, false, exception.getMessage()));
		return builder.build();
	}

	private Response buildViolationReportResponse(Exception exception, Status status) {
		ResponseBuilder builder = Response.status(status);

		// Default media type.
		builder.type(MediaType.APPLICATION_JSON);
		builder.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		builder.header("Access-Control-Allow-Origin", "*");
		builder.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");

		builder.status(Status.INTERNAL_SERVER_ERROR);

		builder.entity(new CadastroResponse<>(null, false, exception.getMessage()));
		return builder.build();
	}

	private Response buildResponse(String message, Status status) {
		List<ErrorField> list = new ArrayList<>();
		list.add(new ErrorField(message));

		ResponseBuilder builder = Response.status(status).entity(list);

		builder.type(MediaType.APPLICATION_JSON);
		builder.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		builder.header("Access-Control-Allow-Origin", "*");
		builder.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");

		builder.status(Status.INTERNAL_SERVER_ERROR);
		builder.entity(new CadastroResponse<>(null, false, message));

		return builder.build();
	}

	private String unwrapException(Throwable t) {
		StringBuffer sb = new StringBuffer();
		this.doUnwrapException(sb, t);
		return sb.toString();
	}

	private void doUnwrapException(StringBuffer sb, Throwable t) {
		if (t == null) {
			return;
		}
		sb.append(t.toString());
		if ((t.getCause() != null) && (t != t.getCause())) {
			sb.append('[');
			this.doUnwrapException(sb, t.getCause());
			sb.append(']');
		}
	}
}
