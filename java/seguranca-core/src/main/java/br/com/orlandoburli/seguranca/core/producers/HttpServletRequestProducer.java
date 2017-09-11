package br.com.orlandoburli.seguranca.core.producers;

import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpServletRequest;

@WebListener
public class HttpServletRequestProducer implements ServletRequestListener {

	private final static ThreadLocal<HttpServletRequest> REQUEST_HOLDER = new ThreadLocal<>();

	@Override
	public void requestInitialized(ServletRequestEvent event) {
		HttpServletRequest request = (HttpServletRequest) event.getServletRequest();
		REQUEST_HOLDER.set(request);
	}

	@Override
	public void requestDestroyed(ServletRequestEvent event) {
		REQUEST_HOLDER.remove();
	}

	// @Produces
	// @RequestScoped
	// public HttpServletRequest getRequest() {
	// return REQUEST_HOLDER.get();
	// }
}
