package br.com.orlandoburli.seguranca.model.tests;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.inject.Inject;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Test;
import org.junit.runner.RunWith;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.model.cadastros.morador.Morador;
import br.com.orlandoburli.seguranca.model.cadastros.morador.MoradorService;
import br.com.orlandoburli.seguranca.model.cadastros.pessoa.Pessoa;
import br.com.orlandoburli.seguranca.model.cadastros.tipopessoa.TipoPessoa;
import br.com.orlandoburli.seguranca.model.cadastros.tipopessoa.TipoPessoaService;
import br.com.orlandoburli.seguranca.model.cadastros.unidade.Unidade;
import br.com.orlandoburli.seguranca.model.cadastros.unidade.UnidadeService;
import br.com.orlandoburli.seguranca.model.utils.NomesUtils;

@RunWith(Arquillian.class)
public class MoradorArquillianTests {

	static final String PATH = "/Users/orlando/Documents/Projetos/seguranca/java/seguranca-app/";

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

	public MoradorArquillianTests() {
		this.randomGenerator = new Random();
	}

	@Deployment
	public static WebArchive createDeployment() {

		// File[] jarsDoPom = Maven.resolver().loadPomFromFile(PATH +
		// "pom.xml").importDependencies(ScopeType.TEST).resolve().withTransitivity().asFile();

		WebArchive war = ShrinkWrap.create(WebArchive.class, "seguranca-model-test.war")
				// add all classes
				.addPackages(true, "br.com.orlandoburli")
				// enable CDI
				.addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml")
				// add sample data
				// .addAsResource("import.sql")
				// para funcionar o CDIServiceLocator
				// .addAsResource("META-INF/context.xml")
				// add messages
				// .addAsResource("ValidationMessages.properties")
				// enable JPA
				.addAsResource("META-INF/test-persistence.xml", "META-INF/persistence.xml")
				// Deploy our test datasource para usar o banco H2 em memoria
				// .addAsWebInfResource("test-ds.xml", "test-ds.xml")
				// Adiciona o arquivo web.xml
				.addAsWebInfResource("web.xml", "web.xml")
		// adiciona os jar do pom
		// .addAsLibraries(jarsDoPom)
		;
		// print files included into war
		System.out.println(war.toString(true));

		return war;
	}

	@Test
	public void testGerarMoradores() throws BusinessException {
		this.gerarMoradoresRandom(1000);
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
