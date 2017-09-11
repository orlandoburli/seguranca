package br.com.orlandoburli.seguranca.resources.cadastros;

import java.util.UUID;

import javax.ejb.Stateless;
import javax.transaction.Transactional;
import javax.ws.rs.Path;

import br.com.orlandoburli.seguranca.core.services.AbstractCrudResource;
import br.com.orlandoburli.seguranca.model.cadastros.bloco.Bloco;
import br.com.orlandoburli.seguranca.model.cadastros.bloco.BlocoDao;
import br.com.orlandoburli.seguranca.model.cadastros.bloco.BlocoService;

@Path("/bloco")
@Stateless
@Transactional
public class BlocoResource extends AbstractCrudResource<UUID, Bloco, BlocoDao, BlocoService> {

}