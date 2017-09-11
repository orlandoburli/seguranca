package br.com.orlandoburli.seguranca.core.vo;

import java.io.Serializable;

public interface IEntity<E> extends Serializable {

	public abstract E getId();

	public abstract void setId(E id);

	public abstract void setEmpresa(IEmpresa empresa);

	public abstract IEmpresa getEmpresa();
}
