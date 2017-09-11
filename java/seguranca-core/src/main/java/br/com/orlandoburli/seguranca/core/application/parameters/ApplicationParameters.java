package br.com.orlandoburli.seguranca.core.application.parameters;

import java.io.Serializable;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ApplicationParameters implements Serializable {

	private static final long serialVersionUID = 1L;

	private int sessionTimeout;

	public ApplicationParameters() {
		// Define padrao dos parametros
		this.setSessionTimeout(2);
	}

	/**
	 * Timeout from user sessions, in minutes
	 *
	 * @return Session Timeout
	 */
	public int getSessionTimeout() {
		return this.sessionTimeout;
	}

	/**
	 * Timeout for user sesions, in milliseconds
	 *
	 * @return Session Timeout
	 */
	public int getSessionTimeoutMilliSeconds() {
		return this.getSessionTimeout() * 1000 * 60;
	}

	private void setSessionTimeout(int sessionTimeout) {
		this.sessionTimeout = sessionTimeout;
	}
}
