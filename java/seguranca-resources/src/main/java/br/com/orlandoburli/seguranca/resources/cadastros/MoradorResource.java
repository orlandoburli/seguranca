package br.com.orlandoburli.seguranca.resources.cadastros;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.core.services.AbstractCrudResource;
import br.com.orlandoburli.seguranca.core.services.ConsultaRequest;
import br.com.orlandoburli.seguranca.core.services.ConsultaResponse;
import br.com.orlandoburli.seguranca.core.services.filters.annotations.AuthenticationRequired;
import br.com.orlandoburli.seguranca.core.utils.Select2ItemModel;
import br.com.orlandoburli.seguranca.model.cadastros.morador.Morador;
import br.com.orlandoburli.seguranca.model.cadastros.morador.MoradorDao;
import br.com.orlandoburli.seguranca.model.cadastros.morador.MoradorService;
import br.com.orlandoburli.seguranca.model.cadastros.morador.MoradorTests;

@Path("/morador")
@Stateless
@Transactional
@AuthenticationRequired
public class MoradorResource extends AbstractCrudResource<UUID, Morador, MoradorDao, MoradorService> {

	@Inject
	private MoradorTests moradorTests;

	@POST
	@Path("pesquisar")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Override
	public Response pesquisar(ConsultaRequest request) {
		String filtroGeral = request.getFiltro().get("filtroGeral");
		String strUnidade = request.getFiltro().get("idUnidade");

		Integer idUnidade = null;
		if ((strUnidade != null) && !strUnidade.trim().isEmpty()) {
			try {
				idUnidade = Integer.parseInt(strUnidade.trim());
			} catch (NumberFormatException e) {
				idUnidade = null;
			}
		}

		List<Morador> lista = this.getService().buscarPorNome(filtroGeral, idUnidade, request.getPageSize(), request.getPageNumber());
		Integer total = this.getService().totalPorNome(filtroGeral, idUnidade);

		return this.json().status(Status.OK).entity(new ConsultaResponse(lista, total)).build();
	}

	@POST
	@Path("buscarPorNome")
	@JsonInclude(Include.NON_EMPTY)
	public Response buscarPorNome(@QueryParam("q") String nomeQuery, @QueryParam("id") UUID id, @QueryParam("pageSize") Integer pageSize, @QueryParam("page") Integer pageNumber) {

		if (id != null) {
			Morador morador = this.getService().buscar(id);

			List<Select2ItemModel> listaItens = new ArrayList<>(1);

			listaItens.add(new Select2ItemModel(morador.getId(), morador.getPessoa().getNome() + " - " + morador.getUnidade().getNumero() + ""));

			Integer totalPorNome = 1;

			return this.json().status(Status.OK).entity(new ConsultaResponse(listaItens, totalPorNome)).build();
		} else {

			List<Morador> lista = this.getService().buscarPorNome(nomeQuery, null, pageSize, pageNumber);

			List<Select2ItemModel> listaItens = new ArrayList<>(lista.size());

			for (Morador morador : lista) {
				listaItens.add(new Select2ItemModel(morador.getId(), morador.getPessoa().getNome() + " - " + morador.getUnidade().getNumero() + ""));
			}

			Integer totalPorNome = this.getService().totalPorNome(nomeQuery, null);

			return this.json().status(Status.OK).entity(new ConsultaResponse(listaItens, totalPorNome)).build();
		}
	}

	@POST
	@Path("gerarNomesRandom")
	public Response gerarMoradoresRandom(@QueryParam("quantidade") int quantidade) throws BusinessException {
		this.moradorTests.gerarMoradoresRandom(quantidade);

		return this.json().status(Status.OK).build();
	}
}