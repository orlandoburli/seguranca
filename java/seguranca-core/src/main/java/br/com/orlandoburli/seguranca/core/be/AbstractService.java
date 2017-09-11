package br.com.orlandoburli.seguranca.core.be;

import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.enterprise.inject.Instance;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import br.com.orlandoburli.seguranca.core.dao.AbstractDao;
import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.core.exceptions.ErrorField;
import br.com.orlandoburli.seguranca.core.services.annotations.UserSession;
import br.com.orlandoburli.seguranca.core.vo.IEmpresa;
import br.com.orlandoburli.seguranca.core.vo.IEntity;

public abstract class AbstractService<K, V extends IEntity<K>, D extends AbstractDao<K, V>> {

	@Inject
	private Instance<D> dao;

	@Inject
	private EntityManager manager;

	@Inject
	@UserSession
	private IEmpresa empresaSessao;

	protected D getDao() {
		return this.dao.get();
	}

	public void begin() {
		this.manager.getTransaction().begin();
	}

	public void end() {
		this.manager.getTransaction().commit();
	}

	public void back() {
		this.manager.getTransaction().rollback();
	}

	public void flush() {
		this.manager.flush();
	}

	public <T> void validate(T vo) throws BusinessException {
		ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
		Validator validator = factory.getValidator();

		Set<ConstraintViolation<T>> constraintViolations = validator.validate(vo);

		if (constraintViolations.size() > 0) {
			List<ErrorField> errors = new ArrayList<>();

			Iterator<ConstraintViolation<T>> iterator = constraintViolations.iterator();

			while (iterator.hasNext()) {
				ConstraintViolation<T> cv = iterator.next();
				errors.add(new ErrorField(cv.getPropertyPath().toString(), cv.getMessage()));
			}

			throw new BusinessException("Erro ao salvar dados", errors);
		}
	}

	public V inserir(V vo) throws BusinessException {
		this.doAntesInserir(vo);
		this.doAntesSalvar(vo);

		this.validate(vo);

		vo = this.getDao().inserir(vo);

		this.doDepoisInserir(vo);
		this.doDepoisSalvar(vo);

		return vo;
	}

	public V atualizar(V vo) throws BusinessException {
		this.doAntesAtualizar(vo);
		this.doAntesSalvar(vo);

		this.validate(vo);

		vo = this.getDao().atualizar(vo);

		this.doDepoisAtualizar(vo);
		this.doDepoisSalvar(vo);

		return vo;
	}

	public V remover(K id) throws BusinessException {
		V vo = this.getDao().buscar(id);

		if (vo == null) {
			throw new EntityNotFoundException("Entidade " + this.getVOClass().getSimpleName() + " não encontrada com o ID " + id);
		}

		this.doAntesRemover(vo);

		vo = this.getDao().remover(vo);

		this.doDepoisRemover(vo);

		return vo;
	}

	public V remover(V vo) throws BusinessException {
		this.doAntesRemover(vo);

		vo = this.getDao().remover(vo);

		this.doDepoisRemover(vo);

		return vo;
	}

	public V buscar(V vo) {
		this.doAntesBuscar(vo);

		V buscar = this.getDao().buscar(vo.getId());

		this.doDepoisBuscar(buscar);

		return buscar;
	}

	public V buscar(K id) {
		this.doAntesBuscar(id);

		V buscar = this.getDao().buscar(id);

		this.doDepoisBuscar(buscar);

		return buscar;
	}

	public List<V> consultar(Map<String, String> filtros, Integer pageSize, Integer pageNumber, Map<String, String> order) {

		// Injetar a sessao do usuario e filtrar pela empresa

		if (!this.getVOClass().isAssignableFrom(IEmpresa.class)) {
			// Somente pula o filtro se for a propria empresa
			if (this.empresaSessao == null) {
				return null;
			}

			filtros.put("empresa.id", this.empresaSessao.getId().toString());
		}

		this.doAntesConsultar(filtros, pageSize, pageNumber, order);

		List<V> consultar = this.getDao().consultar(filtros, pageSize, pageNumber, order);

		this.doDepoisConsultar(consultar);

		return consultar;
	}

	public Integer total(Map<String, String> filtros) {

		// Injetar a sessao do usuario e filtrar pela empresa

		if (!this.getVOClass().isAssignableFrom(IEmpresa.class)) {
			// Somente pula o filtro se for a propria empresa
			if (this.empresaSessao == null) {
				return null;
			}

			filtros.put("empresa.id", this.empresaSessao.getId().toString());
		}

		this.doAntesTotal(filtros);

		Integer total = this.getDao().total(filtros);

		this.doDepoisTotal(total);

		return total;
	}

	public void detach(V vo) {
		this.getDao().detach(vo);
	}

	public void doAntesSalvar(V vo) throws BusinessException {

	}

	public void doAntesInserir(V vo) throws BusinessException {

	}

	public void doAntesAtualizar(V vo) throws BusinessException {

	}

	public void doAntesRemover(V vo) throws BusinessException {

	}

	public void doAntesBuscar(V vo) {

	}

	public void doAntesBuscar(K id) {

	}

	public void doAntesConsultar(Map<String, String> filtros, Integer pageSize, Integer pageNumber, Map<String, String> order) {

	}

	public void doAntesTotal(Map<String, String> filtros) {

	}

	public void doDepoisSalvar(V vo) throws BusinessException {

	}

	public void doDepoisInserir(V vo) throws BusinessException {

	}

	public void doDepoisAtualizar(V vo) throws BusinessException {

	}

	public void doDepoisRemover(V vo) throws BusinessException {

	}

	public void doDepoisBuscar(V vo) {

	}

	public void doDepoisConsultar(List<V> consultar) {

	}

	public void doDepoisTotal(Integer total) {

	}

	// @SuppressWarnings("unchecked")
	// public Class<V> getTypeClass() {
	// return (Class<V>) ((ParameterizedType)
	// this.getClass().getGenericSuperclass()).getActualTypeArguments()[1];
	// }

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
}