package br.com.orlandoburli.seguranca.resources.tabelasbasicas;

import java.util.UUID;

import javax.ejb.Stateless;
import javax.transaction.Transactional;
import javax.ws.rs.Path;

import br.com.orlandoburli.seguranca.core.services.AbstractCrudResource;
import br.com.orlandoburli.seguranca.model.tabelasbasicas.porta.Porta;
import br.com.orlandoburli.seguranca.model.tabelasbasicas.porta.PortaDao;
import br.com.orlandoburli.seguranca.model.tabelasbasicas.porta.PortaService;

@Path("/porta")
@Stateless
@Transactional
public class PortaResource extends AbstractCrudResource<UUID, Porta, PortaDao, PortaService> {

}