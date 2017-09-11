package br.com.orlandoburli.seguranca.core.utils;

public class EnvironmentUtil {

	private static final String AMBIENTE = "ambiente";

	/**
	 * Retorna o ambiente atual, configurado no servidor.
	 *
	 * @return Tipo do Ambiente.
	 */
	public static EnvironmentType getCurrent() {
		String ambiente = System.getProperty(AMBIENTE);
		EnvironmentType currentEnv = EnvironmentType.valueOf(ambiente);

		// Se nao localizar, assume como LOCAL.
		if (currentEnv == null) {
			currentEnv = EnvironmentType.LOCAL;
		}
		return currentEnv;
	}
}
