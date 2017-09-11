package br.com.orlandoburli.seguranca.core.vo;

public abstract class AbstractEntity<E> implements IEntity<E> {

	private static final long serialVersionUID = 1L;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = (prime * result) + ((this.getId() == null) ? 0 : this.getId().hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (!(obj instanceof AbstractEntity<?>)) {
			return false;
		}
		@SuppressWarnings("unchecked")
		final AbstractEntity<E> other = (AbstractEntity<E>) obj;
		if (this.getId() == null) {
			if (other.getId() != null) {
				return false;
			}
		} else if (!this.getId().equals(other.getId())) {
			return false;
		}
		return true;
	}

}