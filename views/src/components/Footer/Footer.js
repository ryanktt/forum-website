import React, {useState} from 'react';
import style from './Footer.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';

const Footer = (props) => {
    const [privacyRulesActive, setPrivacyRulesActive] = useState(false);
    let active = '';
    if(privacyRulesActive) active = style.Active

    const classes = [style.PrivacyRules, active].join(' ');

    const TogglePrivacyRules = () => {
        setPrivacyRulesActive(!privacyRulesActive);
    }

    const privacyStr = `Regras de Uso e Política de Privacidade FórumPlayers

    O conteúdo publicado nos produtos interativos do FórumPlayers é de única e exclusiva responsabilidade civil e penal do assinante e/ou visitante cadastrado cuja senha tenha sido usada para sua criação.
    
    É proibido publicar, divulgar, propagar ou disseminar qualquer material protegido por direitos autorais, sem a devida autorização do autor ou de seu representante. É proibido, ainda, publicar imagens de pessoas sem prévia autorização.
    
    O FórumPlayers não se responsabiliza pelo conteúdo, opiniões e comentários dos freqüentadores. O conteúdo publicado por assinantes ou visitantes nos produtos interativos não é revisado ou fiscalizado pelo FórumPlayers.
    
    Porém, o FórumPlayers poderá, a qualquer tempo e a seu critério, deixar qualquer conteúdo fora do âmbito do seu portal na Internet ou excluir, parcial ou integralmente, qualquer conteúdo disponibilizado pelos usuários ou visitantes de seus serviços, caso possa ser interpretado que o referido conteúdo é contrário às normas legais em vigor, às presentes regras ou em razão de denúncias, sem que isto gere qualquer responsabilidade ao FórumPlayers ou direito ao usuário.
    
    Se por mais de uma vez forem descumpridas quaisquer das regras expostas ou for verificado o exercício de ilegalidades, o perfil será suspenso ou excluído.
    
    O FórumPlayers não se responsabiliza por qualquer dano supostamente decorrente do uso. O FórumPlayers se reserva o direito de modificar as regras de uso a qualquer momento, sob seu exclusivo critério.
    
    O conteúdo publicado ou comentado no FórumPlayers não deve conter os seguintes itens:
    
    - Material pornográfico ou atividades ilegais incluindo menores de 18 anos (segundo o artigo 241 do Estatuto da Criança e do Adolescente);
    - Material e/ou linguagem grosseira ou ofensiva;
    - Prática, indução ou incitação de preconceito quanto à origem, raça, etnia, sexo, orientação sexual, cor, idade, crença religiosa ou qualquer outra forma de discriminação;
    - Material calunioso, abusivo ou que invada a privacidade de alguém;
    - Imagens e/ou linguagem obscena ou pornográfica;
    - Afirmações injuriosas ou difamatórias;
    - Informação sobre atividades ilegais e incitação ao crime;
    - Material protegido por direitos autorais, nem publicar fotos ou textos sem autorização do autor ou de seu representante legal, publicar fotos sem autorização dos fotografados e distribuir arquivos de som sem autorização de pessoas ou empresas responsáveis;
    - Informação relativa à pirataria de material protegido pelas leis de direitos autorais e propriedade;
    - Divulgar como próprio ou sem a devida autorização nomes, contatos e demais informações de terceiros;
    - Propaganda eleitoral;
    - Banners publicitários;
    - Páginas e arquivos criptografados ou protegidos por senhas;
    - Programas e arquivos que contenham vírus ou qualquer outro código malicioso;
    - Arquivos que sejam exclusivamente acessados por Websites hospedados fora do FórumPlayers;
    - Defesa ou estímulo às práticas de bulimia e/ou anorexia;
    - Material que viole qualquer ética libertária ou lei;
    - Material que configure crime virtual
    - Aplicam-se ainda aos usuários dos serviços FórumPlayers as Normas de Segurança e Privacidade do FórumPlayers.
    - Que caracterizem prática de spam;
    - Que caracterizem prática de flood;
    - Fora do contexto do grupo ou tópico escolhido (offs).
    Para garantir o cumprimento das regras acima, mediante denúncia dos seus próprios usuários ou mesmo verificação única na medida do possível, o FórumPlayers poderá usar bloqueio de endereços IP e suspensão da conta.
    
    Denuncie quebra de regras e crimes virtuais
    
    O FórumPlayers declara que nenhum vídeo ou imagem são hospedados, sendo que os mesmos são inseridos através de links de terceiros sem vínculo com o FórumPlayers e no qual seus usuários tem total responsabilidade.
    
    O usuário será integralmente responsável por todo e qualquer conteúdo que venha a disponibilizar, produzir ou incluir no FórumPlayers Mais, respondendo civil e penalmente por este conteúdo. Os autores dos vídeos, fotos, textos e áudios não podem publicar trechos dos respectivos conteúdos, a saber, vídeos, áudios, músicas ou textos, assim como imagens, protegidos por direitos autorais, nem publicar qualquer tipo de conteúdo de terceiros sem autorização do autor ou de seu representante. Não devem também publicar imagens de pessoas sem prévia autorização.
    
    O FórumPlayers não fiscalizará o conteúdo publicado, porém o FórumPlayers poderá, a qualquer tempo e a seu critério, deixar um ou mais vídeos, imagens, áudios ou textos fora do âmbito do seu portal na Internet ou deixar de incluir, parcial ou integralmente, qualquer conteúdo de propriedade do usuário, caso possa ser interpretado que o referido conteúdo é contrário às normas legais em vigor, sem que isto gere qualquer responsabilidade ao FórumPlayers ou direito ao usuário.
    
    Os vídeos, fotos, áudios e textos publicados no FórumPlayers Mais poderão ser reproduzidos e linkados em sites e blogs de outros usuários, sem qualquer ônus ao FórumPlayers ou a estes usuários. O FórumPlayers também se reserva o direito de reproduzir e publicar, sem qualquer ônus, imagens ou trechos dos vídeos, fotos, áudios e textos publicados por qualquer dos usuários, em qualquer meio, a qualquer momento.
    
    O FórumPlayers agradece a compreensão e a colaboração de todos os usuários que façam sua denúncia anônima. Todos os tópicos e comentários possuem o respectivo link de denúncia.
    Ao postar conteúdo, o usuário deverá, em qualquer hipótese, respeitar os termos e condições pertinentes, em especial, mas sem se limitar às dispostas abaixo:
    
    - Não se responsabiliza pelas opiniões e comentários dos titulares, usuários ou visitantes do FórumPlayers Mais. O conteúdo de cada video, texto, imagem, áudio ou comentário é de única e exclusiva responsabilidade civil e penal do autor da mensagem. As informações contidas nas mensagens não são conferidas ou de qualquer forma endossadas pelo FórumPlayers;
    - Se reserva o direito de, a qualquer tempo e a seu exclusivo critério, retirar qualquer mensagem que possa ser interpretada contrária a estas Regras de Uso ou às normas legais em vigor;
    - Poderá editar trechos de mensagens e publicá-las, para a divulgação do FórumPlayers, sem que isto gere qualquer direito ao usuário ou qualquer ônus ao FórumPlayers;
    - Não se responsabiliza por qualquer dano supostamente decorrente do uso deste serviço;
    - Não se compromete, em nenhuma hipótese, a manter nenhum tipo de backup do conteúdo publicado pelo usuário no serviço;
    - Se reserva o direito de modificar as regras acima a qualquer momento, a seu exclusivo critério, independente de prévia notificação.
    
    POLÍTICA DE PRIVACIDADE
    
    O USUÁRIO permite a leitura de terceiros aos seus posts e informações públicas, bem como apelido, estado, cidade e imagem do avatar cadastrada, porém, o ForumVT não garante a integridade de nenhuma informação imputada pelo usuário.
    
    O USUÁRIO reconhece e concorda ser responsável por manter a confidencialidade de senhas utilizada para acessar o Forum VT. Desta forma, concorda que será o único responsável por todas as atividades que ocorram na sua conta.
    
    O USUÁRIO reconhece e concorda que o FórumPlayers não endossa o conteúdo divulgado, e conforme disposto acima, não é responsável por qualquer material, seja ilegal, difamatório, que viole direitos de privacidade, ou que seja abusivo, ameaçador, obsceno, injurioso ou censurável de qualquer forma ou que infrinja ou possa infringir direitos de propriedade intelectual.
    
    CONDUTA E OBRIGAÇÕES DO USUÁRIO
    
    Como condição para usufruir dos serviços mencionados nesse Termo, o USUÁRIO declara:
    
    - ser maior de 18 anos, ou menor devidamente autorizado pelos pais ou responsável;
    - que não utilizará tais serviços para fins ilegais;
    - não utilizar tais serviços para transmitir/divulgar material ilegal, difamatório, que viole a privacidade de terceiros, ou que seja abusivo, ameaçador, obsceno, prejudicial, vulgar obsceno, injurioso, ou de qualquer outra forma censurável;
    - não transmitir e/ou divulgar qualquer material que viole direitos de terceiro, incluindo, mas sem limitação, direitos de propriedade intelectual de terceiros;
    - não se fazer passar por terceiros;
    - não utilizar tais serviços para divulgar/expor quaisquer tipos de vírus ou arquivos contendo quaisquer tipos de vírus (Cavalos de Tróia) ou que possam causar danos a terceiros;
    - não praticar quaisquer atos que violem qualquer lei ou regulamento local, estadual, nacional ou internacional aplicável;
    - cumprir todas as leis aplicáveis com relação à transmissão de dados no território onde o usuário resida;
    - não obter ou tentar obter acesso não-autorizado a outros sistemas ou redes de computadores conectados ao serviço;
    - ser o único responsável pelo conteúdo e informações que vier a disponibilizar no FórumPlayers;
    - não interferir ou interromper os serviços ou os servidores ou redes conectados ao serviço;
    - cumprir todos os requerimentos, procedimentos, políticas, e regulamentos de redes conectadas ao serviço;
    - ser sua responsabilidade providenciar todo o equipamento necessário para efetuar sua conexão à Internet, incluindo mas não se limitando a energia elétrica, linha telefônica, computador e modem;
    - estar ciente de que terá a utilização será suspensa ou cancelada caso tome o conhecimento, por si ou por terceiros que o USUÁRIO violou qualquer disposição deste Termo de Uso, por qualquer modo.`

    return (
        <>
            {privacyRulesActive ? <Backdrop clicked={TogglePrivacyRules}/> : null}
            <div className={style.Footer}>
                <div className={classes}><p>{privacyStr}</p></div>
                <p>FórumPlayers - Todo conteúdo publicado é de total responsabilidade dos usuários que concordaram nas <span onClick={TogglePrivacyRules}>Regras de Uso e Política de Privacidade</span>. Não armazenamos nenhum conteúdo multimídia. Relate qualquer violação através do botão de report.</p>
            </div>
        </>
    )
}

export default Footer;
