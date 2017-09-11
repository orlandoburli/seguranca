package br.com.orlandoburli.seguranca.model.geral.sessaousuario;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import br.com.orlandoburli.seguranca.core.application.parameters.ApplicationParameters;
import br.com.orlandoburli.seguranca.core.enuns.FormaLogoff;
import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.core.services.ISessaoUsuarioService;
import br.com.orlandoburli.seguranca.core.services.annotations.UserSession;
import br.com.orlandoburli.seguranca.core.vo.IEmpresa;
import br.com.orlandoburli.seguranca.core.vo.ISessaoUsuario;
import br.com.orlandoburli.seguranca.model.geral.sessaousuario.excluidas.SessaoUsuarioExcluidaService;

public class SessaoUsuarioService implements ISessaoUsuarioService {

	private static final String AUTHENTICATION_TOKEN_HEADER = "AUTHENTICATION_TOKEN";

	@Inject
	private transient Logger log;

	@Inject
	private SessaoUsuarioDao dao;

	@Inject
	private ApplicationParameters params;

	@Inject
	private SessaoUsuarioExcluidaService sessaoUsuarioExcluidaService;

	@Inject
	private HttpServletRequest request;

	public List<SessaoUsuario> getAtivos() {
		Map<String, String> filtros = new HashMap<>();
		Map<String, String> order = new HashMap<>();
		return this.dao.consultar(filtros, null, null, order);
	}

	@Override
	public void checkSession(ISessaoUsuario sessaoUsuario) throws BusinessException {
		// Regra de negocio para manter sessao viva

		if (sessaoUsuario != null) {

			final SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");

			this.log.trace("Checando sessão " + sessaoUsuario.getId() + "[" + sessaoUsuario.getUsuario().getNome() + "]");

			// Calcula a data limite de interação do usuário
			final Calendar limit = (Calendar) sessaoUsuario.getUltimaInteracao().clone();
			limit.add(Calendar.MINUTE, this.params.getSessionTimeout());

			this.log.trace("Última interação: " + sdf.format(sessaoUsuario.getUltimaInteracao().getTime()));

			this.log.trace("Limite: " + sdf.format(limit.getTime()));

			final Calendar now = Calendar.getInstance();

			this.log.trace("Agora: " + sdf.format(now.getTime()));

			// Se a data limite for antes da data/hora atual, expira a sessão.
			if (limit.before(now)) {
				this.log.trace("Expirando sessão " + sessaoUsuario.getId() + " [" + sessaoUsuario.getUsuario().getNome() + "]");

				// Logoff por falta de interação
				this.logoff(sessaoUsuario, FormaLogoff.SEM_INTERACAO);
			}
		}
	}

	@Override
	public void logoff(ISessaoUsuario sessaoUsuario, FormaLogoff formaLogoff) throws BusinessException {
		// Clona os dados na sessao excluida
		this.sessaoUsuarioExcluidaService.criarSessaoExcluida((SessaoUsuario) sessaoUsuario, formaLogoff);

		// Exclui a sessao
		this.dao.remover((SessaoUsuario) sessaoUsuario);
	}

	/**
	 * Produz a sessao do usuario
	 *
	 * @param ip
	 * @return
	 */
	@Override
	@Produces
	@UserSession
	public SessaoUsuario getSessaoUsuarioCorrente(InjectionPoint ip) {
		if (this.request == null) {
			this.log.warn("Request não disponível em " + ip.getClass().getName());
			return null;
		}

		String token = this.request.getHeader(AUTHENTICATION_TOKEN_HEADER);

		if ((token == null) || (token.trim().isEmpty())) {
			this.log.debug("Header " + AUTHENTICATION_TOKEN_HEADER + " não disponível neste request.");
			return null;
		}

		UUID idSessao = null;

		try {
			idSessao = UUID.fromString(token);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			this.log.error("Token inválido: [" + token + "]");
			return null;
		}

		SessaoUsuario sessaoUsuario = this.dao.buscar(idSessao);

		if (sessaoUsuario == null) {
			this.log.debug("Sessão de usuário não encontrada com o token [" + token + "].");
		} else {
			this.log.debug("Injetando SessaoUsuario para o token [ " + sessaoUsuario.getId() + "] - Usuário [" + sessaoUsuario.getUsuario().getNome() + "]");
		}

		return sessaoUsuario;
	}

	@Override
	@Produces
	@UserSession
	public IEmpresa getEmpresaSessaoCorrente(InjectionPoint ip) {
		SessaoUsuario sessaoUsuarioCorrente = this.getSessaoUsuarioCorrente(ip);

		if (sessaoUsuarioCorrente != null) {
			return sessaoUsuarioCorrente.getEmpresa();
		}

		return null;
	}

	/**
	 * Atualiza a a sessao do usuario
	 *
	 * @param sessaoUsuario
	 * @throws BusinessException
	 */
	@Override
	public void alive(ISessaoUsuario sessaoUsuario) throws BusinessException {
		sessaoUsuario.setUltimaInteracao(Calendar.getInstance());

		this.dao.atualizar((SessaoUsuario) sessaoUsuario);
	}

	public SessaoUsuario inserir(SessaoUsuario sessaoUsuario) {
		return this.dao.inserir(sessaoUsuario);
	}

	public ISessaoUsuario buscar(UUID token) {
		return this.dao.buscar(token);
	}
}
