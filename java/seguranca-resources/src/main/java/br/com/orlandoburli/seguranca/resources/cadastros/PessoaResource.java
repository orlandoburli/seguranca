package br.com.orlandoburli.seguranca.resources.cadastros;

import java.util.List;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.core.services.AbstractCrudResource;
import br.com.orlandoburli.seguranca.core.services.ConsultaRequest;
import br.com.orlandoburli.seguranca.core.services.ConsultaResponse;
import br.com.orlandoburli.seguranca.core.services.filters.annotations.AuthenticationRequired;
import br.com.orlandoburli.seguranca.model.cadastros.pessoa.Pessoa;
import br.com.orlandoburli.seguranca.model.cadastros.pessoa.PessoaDao;
import br.com.orlandoburli.seguranca.model.cadastros.pessoa.PessoaService;
import br.com.orlandoburli.seguranca.model.cadastros.pessoa.PessoaTests;
import br.com.orlandoburli.seguranca.model.tabelasbasicas.estado.EstadoService;

@Path("/pessoa")
@Stateless
@Transactional
@AuthenticationRequired
public class PessoaResource extends AbstractCrudResource<UUID, Pessoa, PessoaDao, PessoaService> {

	@Inject
	private EstadoService estadoBe;

	@Inject
	private PessoaTests pessoaTests;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/estados")
	public Response estados() throws BusinessException {
		ConsultaResponse response = new ConsultaResponse();
		response.setLista(this.estadoBe.getAll());
		response.setTotal(response.getLista().size());

		return this.json().status(Status.OK).entity(response).build();
	}

	@POST
	@Path("pesquisar")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Override
	public Response pesquisar(ConsultaRequest request) {

		List<Pessoa> lista = this.getService().consultaGenerica(request.getFiltro(), request.getPageSize(), request.getPageNumber(), request.getOrder());
		Integer total = this.getService().consultaGenericaTotal(request.getFiltro());

		this.detach(lista);

		return this.json().status(Status.OK).entity(new ConsultaResponse(lista, total)).build();
	}

	@POST
	@Path("gerarNomesRandom")
	public Response gerarMoradoresRandom(@QueryParam("quantidade") int quantidade) throws BusinessException {
		this.pessoaTests.gerarPessoasRandom(quantidade);

		return this.json().status(Status.OK).build();
	}
}