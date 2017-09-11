package br.com.orlandoburli.seguranca.core.utils;

import java.text.Normalizer;

public class StringUtils {

	private static final String CHAIN_NUMEROS = "1234567890";

	public static String filtrar(String source, String chain) {
		if ((source == null) || source.isEmpty()) {
			return "";
		}

		if ((chain == null) || chain.isEmpty()) {
			return source;
		}

		StringBuilder sb = new StringBuilder();

		for (int i = 0; i < source.length(); i++) {
			String s = source.substring(i, i + 1);
			if (chain.indexOf(s) >= 0) {
				sb.append(s);
			}
		}

		return sb.toString();
	}

	public static String removerAcentos(String source) {
		if ((source == null) || source.isEmpty()) {
			return "";
		}
		return Normalizer.normalize(source, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");
	}

	public static String filtrarNumero(String source) {
		return filtrar(source, CHAIN_NUMEROS);
	}
}
