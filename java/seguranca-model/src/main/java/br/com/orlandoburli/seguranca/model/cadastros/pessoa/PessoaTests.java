package br.com.orlandoburli.seguranca.model.cadastros.pessoa;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.inject.Inject;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.model.cadastros.tipopessoa.TipoPessoa;
import br.com.orlandoburli.seguranca.model.cadastros.tipopessoa.TipoPessoaService;
import br.com.orlandoburli.seguranca.model.utils.NomesUtils;

public class PessoaTests {

	enum Sexo {
		MASCULINO, FEMININO
	}

	private static List<String> nomesMasculinos = NomesUtils.buildListNomesMasculinos();
	private static List<String> nomesFemininos = NomesUtils.buildListNomesFemininos();
	private static List<String> sobreNomes = NomesUtils.buildListSobreNomes();

	private Random randomGenerator;

	@Inject
	private PessoaService pessoaService;

	@Inject
	private TipoPessoaService tipoPessoaService;

	public PessoaTests() {
		this.randomGenerator = new Random();
	}

	public void gerarPessoasRandom(int quantidade) throws BusinessException {
		Map<String, String> filtros = new HashMap<>();
		filtros.put("ativo", "A");

		Map<String, String> filtrosTipoPessoa = new HashMap<>();
		filtrosTipoPessoa.put("ativo", "A");
		filtrosTipoPessoa.put("morador", "N");

		List<TipoPessoa> tipoPessoaList = this.tipoPessoaService.consultar(filtrosTipoPessoa, null, null, null);

		int contadorTransacoes = 0;
		int maxTransacoes = 100;

		for (int i = 0; i < quantidade; i++) {

			Sexo sexo = Sexo.values()[this.randomGenerator.nextInt(Sexo.values().length)];

			TipoPessoa tipoPessoa = tipoPessoaList.get(this.randomGenerator.nextInt(tipoPessoaList.size()));

			Pessoa m = new Pessoa();

			m.setNome(this.gerarNome(sexo));
			m.setTipoPessoa(tipoPessoa);
			m.setCelular1(this.gerarTelefone());
			m.setCelular2(this.gerarTelefone());
			m.setCpf(this.gerarCPF());

			this.pessoaService.inserir(m);

			contadorTransacoes++;

			if (contadorTransacoes >= maxTransacoes) {
				this.pessoaService.flush();
			}
		}
	}

	private static int calcularDigito(String str) {
		List<Integer> digits = new ArrayList<>(str.length());

		for (int i = 0; i < str.length(); i++) {
			Integer.parseInt(str.substring(i, i + 1));
		}

		int calculateMod11Check = org.hibernate.validator.internal.util.ModUtil.calculateMod11Check(digits);

		return calculateMod11Check;
	}

	public String gerarCPF() {
		char[] numeros = "1234567890".toCharArray();

		StringBuilder cpf = new StringBuilder();

		for (int i = 0; i < 9; i++) {
			int index = this.randomGenerator.nextInt(numeros.length);
			cpf.append(numeros[index]);
		}

		cpf.append(calcularDigito(cpf.toString()));

		if (cpf.length() == 10) {
			cpf.append("0");
		}

		return cpf.toString();
	}

	public String gerarTelefone() {
		char[] numeros = "1234567890".toCharArray();

		StringBuilder fone = new StringBuilder();
		fone.append("65");

		for (int i = 0; i < 9; i++) {
			int index = this.randomGenerator.nextInt(numeros.length);
			fone.append(numeros[index]);
		}

		return fone.toString();
	}

	public String gerarNome(Sexo sexo) {
		StringBuilder nome = new StringBuilder();

		if (sexo == Sexo.MASCULINO) {
			int index = this.randomGenerator.nextInt(nomesMasculinos.size());
			nome.append(nomesMasculinos.get(index));
		} else if (sexo == Sexo.FEMININO) {
			int index = this.randomGenerator.nextInt(nomesFemininos.size());
			nome.append(nomesFemininos.get(index));
		}

		nome.append(" ");

		// Sobrenome
		int index = this.randomGenerator.nextInt(sobreNomes.size());
		nome.append(sobreNomes.get(index));

		return nome.toString();
	}

}
