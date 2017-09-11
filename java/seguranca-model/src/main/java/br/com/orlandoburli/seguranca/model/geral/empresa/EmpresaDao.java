package br.com.orlandoburli.seguranca.model.geral.empresa;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import br.com.orlandoburli.seguranca.core.dao.AbstractDao;

public class EmpresaDao extends AbstractDao<UUID, Empresa> {

	public List<Empresa> listarEmpresasPorNome() {
		Map<String, String> filtros = new HashMap<>();
		Map<String, String> order = new HashMap<>();

		order.put("nome", "ASC");

		return this.consultar(filtros, null, null, order);
	}

}
