package br.com.orlandoburli.seguranca.resources.geral;

import java.util.List;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.transaction.Transactional;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.orlandoburli.seguranca.core.services.AbstractCrudResource;
import br.com.orlandoburli.seguranca.model.geral.empresa.Empresa;
import br.com.orlandoburli.seguranca.model.geral.empresa.EmpresaDao;
import br.com.orlandoburli.seguranca.model.geral.empresa.EmpresaService;

@Path("/empresa")
@Stateless
@Transactional
public class EmpresaResource extends AbstractCrudResource<UUID, Empresa, EmpresaDao, EmpresaService> {

	@POST
	@Path("selecionar")
	public Response listarEmpresasPorNome() {
		List<Empresa> list = this.getService().listarEmpresasPorNome();

		return this.json().entity(list).status(Status.OK).build();
	}
}