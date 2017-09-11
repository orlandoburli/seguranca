package br.com.orlandoburli.seguranca.core.services.filters;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.ext.Provider;

@Provider
public class HeaderFilter implements ContainerRequestFilter {

	@Override
	public void filter(ContainerRequestContext context) throws IOException {
		context.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		context.getHeaders().add("Access-Control-Allow-Origin", "*");
		context.getHeaders().add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
		context.getHeaders().add("Access-Control-Allow-Credentials", "true");
	}
}