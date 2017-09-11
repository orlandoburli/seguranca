package br.com.orlandoburli.seguranca.model.geral.sessaousuario.excluidas;

import java.util.Calendar;

import javax.inject.Inject;

import br.com.orlandoburli.seguranca.core.enuns.FormaLogoff;
import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.model.acesso.usuario.Usuario;
import br.com.orlandoburli.seguranca.model.geral.sessaousuario.SessaoUsuario;

public class SessaoUsuarioExcluidaService {

	@Inject
	private SessaoUsuarioExcluidaDao dao;

	public void criarSessaoExcluida(SessaoUsuario sessaoUsuario, FormaLogoff formaLogoff) throws BusinessException {
		// Criar o registro da sessao excluida

		SessaoUsuarioExcluida sessaoExcluida = new SessaoUsuarioExcluida();
		sessaoExcluida.setDataCriacao(sessaoUsuario.getDataCriacao());
		sessaoExcluida.setUltimaInteracao(sessaoUsuario.getUltimaInteracao());
		sessaoExcluida.setEmpresa(sessaoUsuario.getEmpresa());
		sessaoExcluida.setEnderecoIp(sessaoUsuario.getEnderecoIp());
		sessaoExcluida.setHostName(sessaoUsuario.getHostName());
		sessaoExcluida.setUsuario((Usuario) sessaoUsuario.getUsuario());
		sessaoExcluida.setDataLogoff(Calendar.getInstance());
		sessaoExcluida.setFormaLogoff(formaLogoff);
		sessaoExcluida.setId(sessaoUsuario.getId());

		this.dao.inserir(sessaoExcluida, false);

	}
}
