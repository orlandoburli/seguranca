package br.com.orlandoburli.seguranca.resources.cadastros;

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

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.core.services.AbstractCrudResource;
import br.com.orlandoburli.seguranca.dto.cadastros.UnidadeDTO;
import br.com.orlandoburli.seguranca.model.cadastros.unidade.Unidade;
import br.com.orlandoburli.seguranca.model.cadastros.unidade.UnidadeDao;
import br.com.orlandoburli.seguranca.model.cadastros.unidade.UnidadeService;

@Path("/unidade")
@Stateless
@Transactional
public class UnidadeResource extends AbstractCrudResource<UUID, Unidade, UnidadeDao, UnidadeService> {

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/multiplos")
	public Response cadastrarMultiplos(UnidadeDTO dto) throws BusinessException {
		return this.json().status(Status.OK).entity(this.getService().cadastrarMultiplos(dto.getIdTorre(), dto.getIdBloco())).build();
	}
}