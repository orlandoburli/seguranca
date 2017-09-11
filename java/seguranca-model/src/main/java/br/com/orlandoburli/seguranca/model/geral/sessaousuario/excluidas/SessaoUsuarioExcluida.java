package br.com.orlandoburli.seguranca.model.geral.sessaousuario.excluidas;

import java.util.Calendar;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import br.com.orlandoburli.seguranca.core.enuns.FormaLogoff;
import br.com.orlandoburli.seguranca.core.vo.AbstractEntity;
import br.com.orlandoburli.seguranca.core.vo.IEmpresa;
import br.com.orlandoburli.seguranca.model.acesso.usuario.Usuario;
import br.com.orlandoburli.seguranca.model.enums.converters.FormaLogoffConverter;
import br.com.orlandoburli.seguranca.model.geral.empresa.Empresa;

@Entity
@Table(name = "SESSAO_USUARIO_EXCLUIDA")
public class SessaoUsuarioExcluida extends AbstractEntity<UUID> {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ID_SESSAO_EXCLUIDA", columnDefinition = "uuid")
	private UUID id;

	@ManyToOne
	@NotNull(message = "Empresa é obrigatório")
	@JoinColumn(name = "ID_EMPRESA")
	@JsonDeserialize(as = Empresa.class)
	@JsonSerialize(as = Empresa.class)
	private Empresa empresa;

	@Column(name = "DATA_CRIACAO")
	@Temporal(TemporalType.TIMESTAMP)
	@NotNull(message = "Data de criação é obrigatório")
	private Calendar dataCriacao;

	@Column(name = "ULTIMA_INTERACAO")
	@Temporal(TemporalType.TIMESTAMP)
	@NotNull(message = "Data da última interação é obrigatório")
	private Calendar ultimaInteracao;

	@Column(name = "DATA_LOGOFF")
	@Temporal(TemporalType.TIMESTAMP)
	@NotNull(message = "Data do logoff é obrigatório")
	private Calendar dataLogoff;

	@Column(name = "FORMA_LOGOFF")
	@Convert(converter = FormaLogoffConverter.class)
	@NotNull(message = "Forma de logoff é obrigatório")
	private FormaLogoff formaLogoff;

	@Column(name = "ENDERECO_IP")
	@NotEmpty(message = "Endereço IP é obrigatório")
	private String enderecoIp;

	@Column(name = "HOSTNAME")
	@NotEmpty(message = "Hostname é obrigatório")
	private String hostName;

	@ManyToOne
	@JoinColumn(name = "ID_USUARIO")
	@NotNull(message = "Usuário é obrigatório")
	private Usuario usuario;

	@Override
	public UUID getId() {
		return this.id;
	}

	@Override
	public void setId(UUID id) {
		this.id = id;
	}

	@Override
	public void setEmpresa(IEmpresa empresa) {
		this.empresa = (Empresa) empresa;
	}

	@Override
	public IEmpresa getEmpresa() {
		return this.empresa;
	}

	public Calendar getDataCriacao() {
		return this.dataCriacao;
	}

	public void setDataCriacao(Calendar dataCriacao) {
		this.dataCriacao = dataCriacao;
	}

	public Calendar getUltimaInteracao() {
		return this.ultimaInteracao;
	}

	public void setUltimaInteracao(Calendar ultimaInteracao) {
		this.ultimaInteracao = ultimaInteracao;
	}

	public Calendar getDataLogoff() {
		return this.dataLogoff;
	}

	public void setDataLogoff(Calendar dataLogoff) {
		this.dataLogoff = dataLogoff;
	}

	public String getEnderecoIp() {
		return this.enderecoIp;
	}

	public void setEnderecoIp(String enderecoIp) {
		this.enderecoIp = enderecoIp;
	}

	public String getHostName() {
		return this.hostName;
	}

	public void setHostName(String hostName) {
		this.hostName = hostName;
	}

	public Usuario getUsuario() {
		return this.usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public FormaLogoff getFormaLogoff() {
		return this.formaLogoff;
	}

	public void setFormaLogoff(FormaLogoff formaLogoff) {
		this.formaLogoff = formaLogoff;
	}
}
