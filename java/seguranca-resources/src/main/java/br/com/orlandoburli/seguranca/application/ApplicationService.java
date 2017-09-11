package br.com.orlandoburli.seguranca.application;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("api")
public class ApplicationService extends Application {

	public ApplicationService() {
		// packages("br.com.orlandoburli.seguranca.services.*");
	}
}
