package br.com.orlandoburli.seguranca.core.consumers;

import java.io.IOException;
import java.lang.reflect.ParameterizedType;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.orlandoburli.seguranca.core.consumers.exception.HttpConsumerException;

public abstract class AbstractCrudConsumer<K, I, E extends I> extends AbstractConsumer {

	public I get(K id) {

		try {
			final String retorno = this.httpGet(this.url() + "/" + id);

			final ObjectMapper mapper = new ObjectMapper();

			final I value = mapper.readValue(retorno, this.getVOClass());

			return value;

		} catch (HttpConsumerException | IOException e) {
			e.printStackTrace();
		}

		return null;
	}

	public abstract String url();

	/**
	 * Retorna a classe VO que esta no Generics da classe.
	 *
	 * @return Classe VO.
	 */
	@SuppressWarnings("unchecked")
	protected Class<E> getVOClass() {
		try {
			final ParameterizedType type = (ParameterizedType) this.getClass().getSuperclass().getGenericSuperclass();
			return (Class<E>) type.getActualTypeArguments()[2];
		} catch (final Exception e) {
			final ParameterizedType type = (ParameterizedType) this.getClass().getGenericSuperclass();
			return (Class<E>) type.getActualTypeArguments()[2];
		}
	}
}
