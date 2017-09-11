package br.com.orlandoburli.seguranca.core.dao;

import java.lang.reflect.ParameterizedType;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.TypedQuery;

import org.apache.log4j.Logger;

import br.com.orlandoburli.seguranca.core.utils.DaoUtils;
import br.com.orlandoburli.seguranca.core.utils.ReflectionUtils;
import br.com.orlandoburli.seguranca.core.vo.IEntity;

public abstract class AbstractDao<K, V extends IEntity<K>> {

	@Inject
	private EntityManager manager;

	@Inject
	private Logger log;

	public V buscar(K id) {
		if (id == null) {
			return null;
		}
		return this.manager.find(this.getVOClass(), id);
	}

	public V buscar(V vo) {
		if ((vo == null) || (vo.getId() == null)) {
			return null;
		}
		return this.manager.find(this.getVOClass(), vo.getId());
	}

	public V inserir(V vo) {
		return this.inserir(vo, true);
	}

	public V inserir(V vo, boolean autoIncrement) {
		if (autoIncrement) {
			vo.setId(null);
		}
		this.manager.persist(vo);
		return vo;
	}

	public V atualizar(V vo) {
		V vo2 = this.buscar(vo.getId());

		if (vo2 != null) {
			ReflectionUtils.copy(vo, vo2, false);

			// Clonar relacionamentos com @OneToMany

			vo2 = this.manager.merge(vo2);
		} else {
			throw new EntityNotFoundException("Entidade " + this.getVOClass().getSimpleName() + " não encontrada com o ID " + vo.getId());
		}

		return vo2;
	}

	public V remover(V vo) {
		if (vo == null) {
			throw new EntityNotFoundException("Entidade " + this.getVOClass().getSimpleName() + " não encontrada com o ID Nulo!");
		}

		V entityToRemove = this.buscar(vo.getId());

		if (entityToRemove == null) {
			throw new EntityNotFoundException("Entidade " + this.getVOClass().getSimpleName() + " não encontrada com o ID " + vo.getId());
		}

		this.manager.remove(entityToRemove);

		return vo;
	}

	public V remover(K id) {
		V entityToRemove = this.buscar(id);

		if (entityToRemove == null) {
			throw new EntityNotFoundException("Entidade " + this.getVOClass().getSimpleName() + " não encontrada com o ID " + id);
		}

		return this.remover(entityToRemove);
	}

	public List<V> todos() {
		this.manager.clear();

		TypedQuery<V> query = this.manager.createQuery("SELECT a FROM " + this.getVOClass().getSimpleName() + " a ", this.getVOClass());

		return query.getResultList();
	}

	public List<V> consultar(Map<String, String> filtros, Integer pageSize, Integer pageNumber, Map<String, String> order) {
		this.manager.clear();

		String hql = "SELECT e FROM " + this.getVOClass().getSimpleName() + " e WHERE 1 = 1 ";

		// Build SQL Filtro

		Map<String, Object> parametros = new HashMap<>();

		String whereStatement = DaoUtils.buildWhereStatement(filtros, this.getVOClass(), parametros);

		hql += whereStatement;

		if ((order != null) && (order.size() > 0)) {
			hql += " ORDER BY ";
			boolean first = true;
			Iterator<String> iterator = order.keySet().iterator();

			while (iterator.hasNext()) {
				String campo = iterator.next();

				if (!first) {
					hql += ", ";
				}

				hql += campo + " " + order.get(campo);
				first = false;
			}
		}

		this.log.debug("HQL: " + hql);

		TypedQuery<V> query = this.manager.createQuery(hql, this.getVOClass());

		// Seta os parametros da query
		Iterator<String> paramsIterator = parametros.keySet().iterator();

		while (paramsIterator.hasNext()) {
			String paramName = paramsIterator.next();
			this.log.debug("Parametro: " + paramName + " valor: " + parametros.get(paramName));
			query.setParameter(paramName, parametros.get(paramName));
		}

		// Paginacao
		if ((pageSize != null) && (pageNumber != null)) {
			query.setMaxResults(pageSize);

			int firstResult = (pageNumber - 1) * pageSize;

			query.setFirstResult(firstResult);

			this.log.debug("Page Number: " + pageNumber);
			this.log.debug("Page Size: " + pageSize);
			this.log.debug("Max results calculados: " + query.getMaxResults());
			this.log.debug("First result calculado: " + query.getFirstResult());
		}

		return query.getResultList();
	}

	public Integer total(Map<String, String> filtros) {
		this.manager.clear();

		String hql = "SELECT COUNT(*) FROM " + this.getVOClass().getSimpleName() + " e WHERE 1 = 1 ";

		// Build SQL Filtro
		Map<String, Object> parametros = new HashMap<>();

		String whereStatement = DaoUtils.buildWhereStatement(filtros, this.getVOClass(), parametros);

		hql += whereStatement;

		this.log.debug("HQL: " + hql);

		TypedQuery<Number> query = this.manager.createQuery(hql, Number.class);

		// Seta os parametros da query
		Iterator<String> paramsIterator = parametros.keySet().iterator();

		while (paramsIterator.hasNext()) {
			String paramName = paramsIterator.next();
			query.setParameter(paramName, parametros.get(paramName));
		}

		int count = query.getSingleResult().intValue();

		return count;
	}

	public void detach(V vo) {
		this.getManager().detach(vo);
	}

	/**
	 * Retorna a classe VO que esta no Generics da classe.s
	 *
	 * @return Classe VO.
	 */
	@SuppressWarnings("unchecked")
	protected Class<V> getVOClass() {
		try {
			final ParameterizedType type = (ParameterizedType) this.getClass().getSuperclass().getGenericSuperclass();
			return (Class<V>) type.getActualTypeArguments()[1];
		} catch (Exception e) {
			final ParameterizedType type = (ParameterizedType) this.getClass().getGenericSuperclass();
			return (Class<V>) type.getActualTypeArguments()[1];
		}
	}

	public Logger getLog() {
		return this.log;
	}

	public void setLog(Logger log) {
		this.log = log;
	}

	public EntityManager getManager() {
		return this.manager;
	}

	public void setManager(EntityManager manager) {
		this.manager = manager;
	}
}
