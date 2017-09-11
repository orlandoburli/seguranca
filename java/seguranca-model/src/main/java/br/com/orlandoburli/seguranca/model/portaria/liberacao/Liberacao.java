package br.com.orlandoburli.seguranca.model.portaria.liberacao;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import br.com.orlandoburli.seguranca.core.vo.AbstractEntity;
import br.com.orlandoburli.seguranca.core.vo.IEmpresa;
import br.com.orlandoburli.seguranca.model.acesso.usuario.Usuario;
import br.com.orlandoburli.seguranca.model.cadastros.morador.Morador;
import br.com.orlandoburli.seguranca.model.cadastros.pessoa.Pessoa;
import br.com.orlandoburli.seguranca.model.cadastros.unidade.Unidade;
import br.com.orlandoburli.seguranca.model.enums.FormaAutorizacao;
import br.com.orlandoburli.seguranca.model.enums.TipoAcesso;
import br.com.orlandoburli.seguranca.model.enums.TipoDestino;
import br.com.orlandoburli.seguranca.model.enums.converters.FormaAutorizacaoConverter;
import br.com.orlandoburli.seguranca.model.enums.converters.TipoAcessoConverter;
import br.com.orlandoburli.seguranca.model.enums.converters.TipoDestinoConverter;
import br.com.orlandoburli.seguranca.model.geral.empresa.Empresa;
import br.com.orlandoburli.seguranca.model.portaria.preliberacao.PreLiberacao;
import br.com.orlandoburli.seguranca.model.tabelasbasicas.areacomum.AreaComum;
import br.com.orlandoburli.seguranca.model.tabelasbasicas.porta.Porta;

@Entity
@Table(name = "LIBERACAO")
public class Liberacao extends AbstractEntity<String> {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ID")
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private String id;

	@ManyToOne(targetEntity = Empresa.class)
	@NotNull(message = "Empresa é obrigatório")
	@JoinColumn(name = "ID_EMPRESA")
	@JsonDeserialize(as = Empresa.class)
	@JsonSerialize(as = Empresa.class)
	private IEmpresa empresa;

	@Column(name = "DATA_HORA")
	private Calendar dataHora;

	@ManyToOne
	@JoinColumn(name = "ID_USUARIO")
	private Usuario usuario;

	@ManyToOne
	@JoinColumn(name = "ID_PESSOA")
	private Pessoa pessoa;

	@ManyToOne
	@JoinColumn(name = "ID_PORTA")
	private Porta porta;

	@Column(name = "TIPO_ACESSO")
	@Convert(converter = TipoAcessoConverter.class)
	private TipoAcesso tipoAcesso;

	@ManyToOne
	@JoinColumn(name = "ID_PRE_LIBERACAO")
	private PreLiberacao preLiberacao;

	@ManyToOne
	@JoinColumn(name = "ID_MORADOR_AUTORIZACAO")
	private Morador moradorLiberacao;

	@Convert(converter = TipoDestinoConverter.class)
	@Column(name = "TIPO_DESTINO")
	private TipoDestino tipoDestino;

	@ManyToOne
	@JoinColumn(name = "ID_UNIDADE_DESTINO")
	private Unidade unidadeDestino;

	@ManyToOne
	@JoinColumn(name = "ID_AREA_COMUM")
	private AreaComum areaComumDestino;

	@Convert(converter = FormaAutorizacaoConverter.class)
	@Column(name = "FORMA_AUTORIZACAO")
	private FormaAutorizacao formaAutorizacao;

	@Column(name = "OBSERVACOES")
	private String observacoes;

	@Column(name = "FOTO")
	private String foto;

	@Override
	public String getId() {
		return this.id;
	}

	@Override
	public void setId(String id) {
		this.id = id;
	}

	public Calendar getDataHora() {
		return this.dataHora;
	}

	public void setDataHora(Calendar dataHora) {
		this.dataHora = dataHora;
	}

	public Usuario getUsuario() {
		return this.usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Porta getPorta() {
		return this.porta;
	}

	public void setPorta(Porta porta) {
		this.porta = porta;
	}

	public TipoAcesso getTipoAcesso() {
		return this.tipoAcesso;
	}

	public void setTipoAcesso(TipoAcesso tipoAcesso) {
		this.tipoAcesso = tipoAcesso;
	}

	public Morador getMoradorLiberacao() {
		return this.moradorLiberacao;
	}

	public void setMoradorLiberacao(Morador moradorLiberacao) {
		this.moradorLiberacao = moradorLiberacao;
	}

	public PreLiberacao getPreLiberacao() {
		return this.preLiberacao;
	}

	public void setPreLiberacao(PreLiberacao preLiberacao) {
		this.preLiberacao = preLiberacao;
	}

	public TipoDestino getTipoDestino() {
		return this.tipoDestino;
	}

	public void setTipoDestino(TipoDestino tipoDestino) {
		this.tipoDestino = tipoDestino;
	}

	public Unidade getUnidadeDestino() {
		return this.unidadeDestino;
	}

	public void setUnidadeDestino(Unidade unidadeDestino) {
		this.unidadeDestino = unidadeDestino;
	}

	public AreaComum getAreaComumDestino() {
		return this.areaComumDestino;
	}

	public void setAreaComumDestino(AreaComum areaComumDestino) {
		this.areaComumDestino = areaComumDestino;
	}

	public FormaAutorizacao getFormaAutorizacao() {
		return this.formaAutorizacao;
	}

	public void setFormaAutorizacao(FormaAutorizacao formaAutorizacao) {
		this.formaAutorizacao = formaAutorizacao;
	}

	public String getObservacoes() {
		return this.observacoes;
	}

	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}

	public String getFoto() {
		return this.foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public Pessoa getPessoa() {
		return this.pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	@Override
	public IEmpresa getEmpresa() {
		return this.empresa;
	}

	@Override
	public void setEmpresa(IEmpresa empresa) {
		this.empresa = empresa;
	}
}
