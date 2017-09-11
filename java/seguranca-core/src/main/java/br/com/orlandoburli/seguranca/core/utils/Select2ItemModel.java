package br.com.orlandoburli.seguranca.core.utils;

/**
 * Classe model para retornar dados para um objeto do tipo Select2
 *
 * @author orlando
 *
 */
public class Select2ItemModel {

	private String id;

	private String text;

	public Select2ItemModel() {
	}

	public Select2ItemModel(Object id, Object text) {
		this.setId(id.toString());
		this.setText(text.toString());
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return this.text;
	}

	public void setText(String text) {
		this.text = text;
	}
}
