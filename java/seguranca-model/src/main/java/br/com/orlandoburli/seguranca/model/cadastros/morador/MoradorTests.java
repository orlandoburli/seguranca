package br.com.orlandoburli.seguranca.model.cadastros.morador;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.model.cadastros.pessoa.Pessoa;
import br.com.orlandoburli.seguranca.model.cadastros.tipopessoa.TipoPessoa;
import br.com.orlandoburli.seguranca.model.cadastros.tipopessoa.TipoPessoaService;
import br.com.orlandoburli.seguranca.model.cadastros.unidade.Unidade;
import br.com.orlandoburli.seguranca.model.cadastros.unidade.UnidadeService;
import br.com.orlandoburli.seguranca.model.utils.NomesUtils;

@ApplicationScoped
public class MoradorTests {

	enum Sexo {
		MASCULINO, FEMININO
	}

	private static List<String> nomesMasculinos = NomesUtils.buildListNomesMasculinos();
	private static List<String> nomesFemininos = NomesUtils.buildListNomesFemininos();
	private static List<String> sobreNomes = NomesUtils.buildListSobreNomes();

	private Random randomGenerator;

	@Inject
	private MoradorService moradorService;

	@Inject
	private UnidadeService unidadeService;

	@Inject
	private TipoPessoaService tipoPessoaService;

	public MoradorTests() {
		this.randomGenerator = new Random();
	}

	public void gerarMoradoresRandom(int quantidade) throws BusinessException {
		Map<String, String> filtros = new HashMap<>();
		filtros.put("ativo", "A");

		List<Unidade> unidades = this.unidadeService.consultar(filtros, null, null, null);

		Map<String, String> filtrosTipoPessoa = new HashMap<>();
		filtrosTipoPessoa.put("ativo", "A");
		filtrosTipoPessoa.put("morador", "S");

		List<TipoPessoa> tipoPessoaList = this.tipoPessoaService.consultar(filtrosTipoPessoa, null, null, null);

		int contadorTransacoes = 0;
		int maxTransacoes = 100;

		for (int i = 0; i < quantidade; i++) {

			Sexo sexo = Sexo.values()[this.randomGenerator.nextInt(Sexo.values().length)];

			Unidade unidade = unidades.get(this.randomGenerator.nextInt(unidades.size()));

			TipoPessoa tipoPessoa = tipoPessoaList.get(this.randomGenerator.nextInt(tipoPessoaList.size()));

			System.out.println(this.gerarNome(sexo));

			Morador m = new Morador();
			m.setPessoa(new Pessoa());

			m.getPessoa().setNome(this.gerarNome(sexo));
			m.getPessoa().setTipoPessoa(tipoPessoa);
			m.getPessoa().setCelular1(this.gerarTelefone());
			m.getPessoa().setCelular2(this.gerarTelefone());
			m.getPessoa().setCpf(this.gerarCPF());
			m.setUnidade(unidade);

			this.moradorService.inserir(m);

			contadorTransacoes++;

			if (contadorTransacoes >= maxTransacoes) {
				this.moradorService.flush();
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

		System.out.println(cpf);

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
