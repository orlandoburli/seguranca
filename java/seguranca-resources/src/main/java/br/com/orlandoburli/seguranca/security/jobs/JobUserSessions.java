package br.com.orlandoburli.seguranca.security.jobs;

import java.util.Iterator;

import javax.ejb.Schedule;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;

import org.apache.log4j.Logger;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.model.geral.sessaousuario.SessaoUsuario;
import br.com.orlandoburli.seguranca.model.geral.sessaousuario.SessaoUsuarioService;

@Singleton
@Startup
public class JobUserSessions {

	@Inject
	private transient Logger log;

	@Inject
	private SessaoUsuarioService sessaoUsuarioService;

	@Schedule(second = "0", hour = "*", minute = "*", persistent = false)
	public void run() {
		this.log.debug("Checando sessões...");

		for (Iterator<SessaoUsuario> iterator = this.sessaoUsuarioService.getAtivos().iterator(); iterator.hasNext();) {
			SessaoUsuario sessaoUsuario = iterator.next();

			try {
				this.sessaoUsuarioService.checkSession(sessaoUsuario);
			} catch (BusinessException e) {
				e.printStackTrace();
			}
		}
	}
}