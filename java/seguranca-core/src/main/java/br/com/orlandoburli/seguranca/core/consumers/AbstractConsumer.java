package br.com.orlandoburli.seguranca.core.consumers;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.client.jaxrs.ResteasyClient;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.jboss.resteasy.client.jaxrs.ResteasyWebTarget;

import br.com.orlandoburli.seguranca.core.consumers.exception.HttpConsumerException;

public abstract class AbstractConsumer {

	protected String httpGet(String url) throws HttpConsumerException {
		return this.httpGet(url, MediaType.APPLICATION_JSON_TYPE);
	}

	protected String httpGet(String url, MediaType mediaType) throws HttpConsumerException {
		String result = "";

		Response response = null;

		ResteasyClient client = new ResteasyClientBuilder().build();
		ResteasyWebTarget target = client.target(url);

		try {
			response = target.request(mediaType).get();

			result = response.readEntity(String.class);
		} catch (Exception e1) {
			e1.printStackTrace();
			throw new HttpConsumerException("Não foi possível executar a requisição", -1);
		}

		if (response.getStatus() != 200) {
			throw new HttpConsumerException("Requisição falhou com o status: " + response.getStatus(), response.getStatus());
		}

		return result;
	}
}
