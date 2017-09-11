package br.com.orlandoburli.seguranca.model.tabelasbasicas.areacomum;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import br.com.orlandoburli.seguranca.core.be.AbstractService;
import br.com.orlandoburli.seguranca.model.enums.Status;

public class AreaComumService extends AbstractService<UUID, AreaComum, AreaComumDao> {

	public List<AreaComum> ativas() {

		Map<String, String> filtros = new HashMap<>();
		Map<String, String> order = new HashMap<>();

		filtros.put("ativo", Status.ATIVO.getValor());
		order.put("nome", "ASC");

		return this.getDao().consultar(filtros, null, null, order);
	}
}
