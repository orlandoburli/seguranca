package br.com.orlandoburli.seguranca.core.producers;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;

@ApplicationScoped
public class ProducerEntityManager {

	@Produces
	@PersistenceContext(unitName = "default", type = PersistenceContextType.EXTENDED)
	private EntityManager entityManager;

}