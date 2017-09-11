package br.com.orlandoburli.seguranca.model.tabelasbasicas.porta;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import br.com.orlandoburli.seguranca.core.be.AbstractService;
import br.com.orlandoburli.seguranca.model.enums.Status;
import br.com.orlandoburli.seguranca.model.enums.TipoPorta;

public class PortaService extends AbstractService<UUID, Porta, PortaDao> {

	public List<Porta> entradas() {
		Map<String, String> filtros = new HashMap<>();
		Map<String, String> order = new HashMap<>();

		filtros.put("ativo", Status.ATIVO.getValor());
		filtros.put("tipo", TipoPorta.ENTRADA.getValor());

		order.put("nome", "ASC");

		return this.getDao().consultar(filtros, null, null, order);
	}

}
