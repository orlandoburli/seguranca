package br.com.orlandoburli.seguranca.core.services;

import javax.enterprise.inject.spi.InjectionPoint;

import br.com.orlandoburli.seguranca.core.enuns.FormaLogoff;
import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.core.vo.IEmpresa;
import br.com.orlandoburli.seguranca.core.vo.ISessaoUsuario;

public interface ISessaoUsuarioService {

	void checkSession(ISessaoUsuario sessaoUsuario) throws BusinessException;

	void logoff(ISessaoUsuario sessaoUsuario, FormaLogoff formaLogoff) throws BusinessException;

	/**
	 * Produz a sessao do usuario
	 *
	 * @param ip
	 * @return
	 */
	ISessaoUsuario getSessaoUsuarioCorrente(InjectionPoint ip);

	/**
	 * Produz a empresa da sessao do usuario
	 *
	 * @param ip
	 * @return
	 */
	IEmpresa getEmpresaSessaoCorrente(InjectionPoint ip);

	/**
	 * Mantém a sessao do usuário viva
	 * 
	 * @param sessaoUsuario
	 *            Sessão do usuário
	 * @throws BusinessException
	 */
	public void alive(ISessaoUsuario sessaoUsuario) throws BusinessException;
}