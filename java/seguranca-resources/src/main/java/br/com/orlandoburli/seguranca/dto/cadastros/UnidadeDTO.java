package br.com.orlandoburli.seguranca.dto.cadastros;

import java.util.UUID;

public class UnidadeDTO {

	private int numeroInicial;
	private int andarInicial;
	private int quantidadePorAndar;
	private int quantidadeAndares;
	private UUID idTorre;
	private UUID idBloco;

	public int getNumeroInicial() {
		return this.numeroInicial;
	}

	public void setNumeroInicial(int numeroInicial) {
		this.numeroInicial = numeroInicial;
	}

	public int getQuantidadePorAndar() {
		return this.quantidadePorAndar;
	}

	public void setQuantidadePorAndar(int quantidadePorAndar) {
		this.quantidadePorAndar = quantidadePorAndar;
	}

	public UUID getIdTorre() {
		return this.idTorre;
	}

	public void setIdTorre(UUID idTorre) {
		this.idTorre = idTorre;
	}

	public UUID getIdBloco() {
		return this.idBloco;
	}

	public void setIdBloco(UUID idBloco) {
		this.idBloco = idBloco;
	}

	public int getAndarInicial() {
		return this.andarInicial;
	}

	public void setAndarInicial(int andarInicial) {
		this.andarInicial = andarInicial;
	}

	public int getQuantidadeAndares() {
		return this.quantidadeAndares;
	}

	public void setQuantidadeAndares(int quantidadeAndares) {
		this.quantidadeAndares = quantidadeAndares;
	}
}
