package br.com.orlandoburli.seguranca.core.producers;

import javax.enterprise.inject.Default;
import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;

import org.apache.log4j.Logger;

public class ProducerLogger {

	@Produces
	@Default
	public Logger createLog4J(InjectionPoint ip) {
		Logger log = Logger.getLogger(ip.getMember().getDeclaringClass());
		return log;
	}
}
