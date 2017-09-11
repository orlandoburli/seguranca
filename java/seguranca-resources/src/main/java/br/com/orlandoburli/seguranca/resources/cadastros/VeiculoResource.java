package br.com.orlandoburli.seguranca.resources.cadastros;

import java.util.List;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.orlandoburli.seguranca.core.services.AbstractCrudResource;
import br.com.orlandoburli.seguranca.core.services.ConsultaRequest;
import br.com.orlandoburli.seguranca.core.services.ConsultaResponse;
import br.com.orlandoburli.seguranca.core.services.filters.annotations.AuthenticationRequired;
import br.com.orlandoburli.seguranca.model.cadastros.veiculo.Veiculo;
import br.com.orlandoburli.seguranca.model.cadastros.veiculo.VeiculoDao;
import br.com.orlandoburli.seguranca.model.cadastros.veiculo.VeiculoService;

@Path("/veiculo")
@Stateless
@Transactional
@AuthenticationRequired
public class VeiculoResource extends AbstractCrudResource<UUID, Veiculo, VeiculoDao, VeiculoService> {

	@POST
	@Path("pesquisar")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Override
	public Response pesquisar(ConsultaRequest request) {
		List<Veiculo> lista = this.getService().consultar(request.getFiltro(), request.getPageSize(), request.getPageNumber(), request.getOrder());
		Integer total = this.getService().total(request.getFiltro());

		return this.json().status(Status.OK).entity(new ConsultaResponse(lista, total)).build();
	}

}