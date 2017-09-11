package br.com.orlandoburli.seguranca.core.services;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

public class AbstractResource {

	private static final String CONTENT_TYPE = "Content-Type";
	private static final String APPLICATION_JSON_CHARSET_UTF8 = "application/json; charset=UTF-8";
	private static final String APPLICATION_TEXT_CHARSET_UTF8 = "application/text; charset=UTF-8";

	public ResponseBuilder json() {
		ResponseBuilder response = Response.noContent();
		response.header(CONTENT_TYPE, APPLICATION_JSON_CHARSET_UTF8);
		return response;
	}

	public ResponseBuilder text() {
		ResponseBuilder response = Response.noContent();
		response.header(CONTENT_TYPE, APPLICATION_TEXT_CHARSET_UTF8);
		return response;
	}
}
