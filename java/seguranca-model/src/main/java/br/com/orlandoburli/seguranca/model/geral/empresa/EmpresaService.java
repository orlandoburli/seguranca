package br.com.orlandoburli.seguranca.model.geral.empresa;

import java.util.List;
import java.util.UUID;

import br.com.orlandoburli.seguranca.core.be.AbstractService;

public class EmpresaService extends AbstractService<UUID, Empresa, EmpresaDao> {

	public List<Empresa> listarEmpresasPorNome() {
		return this.getDao().listarEmpresasPorNome();
	}
}
