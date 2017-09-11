package br.com.orlandoburli.seguranca.core.utils;

/**
 * Enum responsável por informar dados do ambiente que a aplicação está rodando
 *
 * @author Lucas Lima
 */
public enum EnvironmentType {
	DESENV("Desenvolvimento", "https://djboss.tce.mt.gov.br"), TESTE("Teste", "https://tjboss.tce.mt.gov.br"), HOMOLOGA("Homologação", "https://hjboss.tce.mt.gov.br"), PRODUCAO("Produção",
			"https://sistema.tce.mt.gov.br"), LOCAL("localhost", "http://localhost:8080");

	private String descricao;

	private String host;

	private EnvironmentType(String descricao, String host) {
		this.descricao = descricao;
		this.host = host;
	}

	public String getDescricao() {
		return this.descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getHost() {
		return this.host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public static EnvironmentType fromString(String requisicao) {
		if (requisicao != null) {
			for (EnvironmentType valorAtual : EnvironmentType.values()) {
				if (requisicao.equals(valorAtual.getDescricao())) {
					return valorAtual;
				}
			}
		}
		return null;
	}
}
