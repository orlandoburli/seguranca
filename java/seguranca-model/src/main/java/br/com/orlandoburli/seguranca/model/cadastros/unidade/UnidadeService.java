package br.com.orlandoburli.seguranca.model.cadastros.unidade;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Path;

import br.com.orlandoburli.seguranca.core.be.AbstractService;
import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.model.cadastros.bloco.Bloco;
import br.com.orlandoburli.seguranca.model.cadastros.bloco.BlocoDao;
import br.com.orlandoburli.seguranca.model.cadastros.bloco.exceptions.BlocoNaoEncontradoException;
import br.com.orlandoburli.seguranca.model.cadastros.torre.Torre;
import br.com.orlandoburli.seguranca.model.cadastros.torre.TorreDao;
import br.com.orlandoburli.seguranca.model.cadastros.torre.exceptions.TorreNaoEncontradaException;
import br.com.orlandoburli.seguranca.model.enums.Flag;
import br.com.orlandoburli.seguranca.model.enums.Status;

@Path("/unidade")
@Stateless
@Transactional
public class UnidadeService extends AbstractService<UUID, Unidade, UnidadeDao> {

	@Inject
	BlocoDao blocoDao;

	@Inject
	TorreDao torreDao;

	@Override
	public void doAntesSalvar(Unidade vo) throws BusinessException {

		vo.setBloco(this.blocoDao.buscar(vo.getBloco()));
		vo.setTorre(this.torreDao.buscar(vo.getTorre()));

		super.doAntesSalvar(vo);
	}

	public int cadastrarMultiplos(UUID idTorre, UUID idBloco) throws BusinessException {
		int quantidade = 0;

		Torre torre = this.torreDao.buscar(idTorre);

		if (torre == null) {
			throw new TorreNaoEncontradaException("Torre não encontrada com o ID " + idTorre);
		}

		Bloco bloco = this.blocoDao.buscar(idBloco);

		if (bloco == null) {
			throw new BlocoNaoEncontradoException("Bloco não encontrado com o ID " + idBloco);
		}

		int inicial = torre.getTerreo() == Flag.SIM ? 0 : 1;

		for (int andar = inicial; andar <= torre.getAndares(); andar++) {

			for (int unidadeNumero = 1; unidadeNumero <= torre.getUnidadesPorAndar(); unidadeNumero++) {

				String numero = String.format("%03d", unidadeNumero + (andar * 100)) + torre.getNome().toUpperCase().replace("TORRE", "").trim();

				Unidade unidade = this.getByNumero(numero);

				if (unidade == null) {
					unidade = new Unidade();
					unidade.setNumero(numero);
					unidade.setTorre(torre);
					unidade.setBloco(bloco);
					unidade.setAtivo(Status.ATIVO);

					this.inserir(unidade);

					quantidade++;
				} else {
					if (!unidade.getBloco().getId().equals(bloco.getId())) {
						unidade.setBloco(bloco);
						this.atualizar(unidade);

						quantidade++;
					}
				}
			}
		}

		return quantidade;
	}

	public Unidade getByNumero(String numeroUnidade) {
		return this.getDao().getBy(numeroUnidade);
	}

	public List<Unidade> ativas() {

		Map<String, String> filtros = new HashMap<>();
		Map<String, String> order = new HashMap<>();

		filtros.put("ativo", Status.ATIVO.getValor());
		order.put("numero", "ASC");

		return this.getDao().consultar(filtros, null, null, order);
	}
}