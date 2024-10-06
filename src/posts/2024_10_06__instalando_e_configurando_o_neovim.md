---
title: Instalando e Configurando o Neovim com Lazy
date: 2024-10-06T00:36:00-03:00
layout: post.njk
image: /images/nvim-min.png
slug: instalando_neovim
---

![A tela inicial do Neovim sem nenhum arquivo aberto](/images/nvim-min.png)

O Neovim é um editor de texto altamente customizável, comparável ao VS Code em termos de extensibilidade, mas oferece vantagens consideráveis para aqueles que buscam uma experiência de desenvolvimento mais fluida e centrada na produtividade. A diferença fundamental está em seu design: o Neovim adota um paradigma de comandos orientados para o teclado, que privilegia a memorização e a eficiência, minimizando a necessidade do uso do mouse.

Nos meus 19 anos de programação, passei por uma grande variedade de editores de texto e IDEs. No entanto, sempre acabo retornando ao Vim. Para mim, ele é insubstituível por vários motivos, e gostaria de compartilhar cinco razões para isso:

1. Eficiência e Leveza: Ele é bastante leve e oferece uma experiência muito fluída, sem travamentos e sem imprevistos sem consumir todos os recursos do computador como o Electron ou IDEs fazem.
2. Faz uma coisa apenas, e bem feita: O Neovim é um exemplo clássico da Filosofia UNIX — ele se concentra em fazer uma única tarefa (edição de texto) e faz isso de forma excepcional. Além disso, ele pode ser integrado facilmente com outras ferramentas do ecossistema UNIX, promovendo um fluxo de trabalho coeso e poderoso. Utilizar o Neovim significa adotar um modelo em que você pode unir as melhores ferramentas disponíveis para realizar suas tarefas, cada uma contribuindo de maneira eficiente e específica.
3. Altamente customizável com inúmeros plugins da comunidade e configurações: Você pode tornar o VIM exatamente o que você precisa para fazer exatamente o que você quer e como você quer através das configurações e plugins.  A comunidade de usuários e desenvolvedores contribui constantemente para um ecossistema vibrante onde você pode encontrar plugins basicamente para qualquer coisa que você precise e até mesmo criar seus próprios utilizando alguma das linguagens de scripting suportadas.


## Vim ou Neovim?

Por muitos anos eu fui um usuário assíduo de VIM (com Vundle como gerenciador de plugins). A minha motivação para preferir VIM era porque por muito tempo eu gostava da ideia de ter linguagens menos poderosas e mais específicas como linguagens de scripting - as DSLs, Domain Specific Languages. Porém, com o tempo, especialmente devido ao tempo em que passei usando Emacs - sim, eu fui usuário de Emacs por alguns anos - comecei a ver diversas vantagens em utilizar uma linguagem de programação completa para fazer a configuração do editor.

Pouco a pouco a ideia de usar Lua ganhou cada vez mais espaço e decidi experimentar Neovim, um fork do VIM feito por um brasileiro que adiciona a linguagem Lua - também brasileira - como linguagem de configuração, permitindo utilizar uma linguagem de scripting usada no mundo real para diversas finalidades como linguagem de scripting do VIM. Por fim, depois de fazer diversos experimentos, eu acabei mudando de ideia e passando a abraçar a ideia de usar Lua como linguagem de configuração do meu ambiente, o que tem sido uma experiência muito boa e que recomendo.

## Instalando o Neovim no Debian / Ubuntu

A primeira coisa que recomendo para quem quiser usar Neovim seja no Debian, no Ubuntu ou outro derivado é que não utilize a versão que vem no aptitude (apt), essas versões costumam estar muito desatualizadas e como o Neovim é um projeto relativamente novo muitos plugins dependem de versões bastante recentes para funcionar pois acabam utilizando alguma feature que não é suportada nas versões mais antigas.

Existem 3 formas de instalar o Neovim no Debian / Ubuntu / Derivados... que recomendo:
1. Usar o gerenciador Pacstall.
2. Usar alguma outra forma de obter versões recentes como Snap ou Flatpak.
3. Compilar direto do código-fonte.

Eu uso e vou ensinar a **1.** porque vejo muitas vantagens em usar o Pacstall uma vez em que ele vai automatizar o processo de compilação e futuramente de atualização do Neovim instalando sempre versões bem recentes. O Pacstall é um gerenciador de pacotes para Ubuntu (e que funciona no Debian devido as semelhanças) que é inspirado no AUR do Arch Linux, ele contêm uma série de scripts de instalação para diferentes programas que são mantidos pela comunidade e que permitem instalar na maior parte dos casos a última versão desses programas e até mesmo programas que normalmente não estão disponíveis nos repositórios da distribuição.

Para instalar o Pacstall rode o comando abaixo para rodar o script bash de instalação que eles disponibilizam:
```bash
$ sudo bash -c "$(curl -fsSL https://pacstall.dev/q/install)"
```
Após rodar essse script vai aparecer um prompt perguntando se quer instalar o pacote `axel` para fazer downloads mais rápidos, isso fica à sua decisão, independente do que escolher a instalação do Pacstall vai continuar, se tudo der certo deve aparecer:
```bash
[+] INFO: Installation complete
```
Agora que temos o Pacstall instalado podemos usá-lo para instalar o Neovim:
```bash
$ pacstall -I neovim
```
> Observe que não foi usado sudo. Pacstall executa os scripts em modo usuário, no final ele vai pedir sua senha para completar.

Ele vai compilar a última versão do Neovim e instalar para você, aguarde completar, isso pode levar algum tempo dependendo das especificações da sua máquina.

Se tudo der certo você pode testar a instalação e a versão instalada rodando o comando: 
```bash
$ nvim -V1 -v
```
E isso deve retornar algo como:
```
NVIM v0.10.2
Build type: Release
LuaJIT 2.1.1713484068

   system vimrc file: "$VIM/sysinit.vim"
  fall-back for $VIM: "/usr/share/nvim"

Run :checkhealth for more info
```
Caso esteja vendo isso, deu tudo certo!

## Comandos básicos

Normalmente alguém lendo um tutorial de instalação do Neovim é alguém que já começou a aprender sobre VIM/Neovim e ainda precisa de ajuda com alguns passos básicos, mas vou assumir que também hajam iniciantes que tenham esse interesse por isso vou dar uma explicação básica sobre como funcionam os modos de edição e os comandos básicos.

#### Modos de Edição

Para quem está começando no Neovim, é essencial entender que ele funciona de maneira diferente dos editores comuns, como VS Code ou Sublime. A principal diferença está nos **modos de edição**, que permitem interagir com o texto de formas distintas. Abaixo, farei uma breve introdução aos principais modos e comandos básicos para facilitar a sua adaptação.

O Neovim possui diferentes modos de operação, e dominar esses modos é essencial para usá-lo de forma eficaz, os quatro mais importantes e que você vai usar em 90% do tempo são:

1. Modo Normal: Este é o modo padrão ao abrir um arquivo. Ele serve para navegação e execução de comandos. Por exemplo, h, j, k, l movem o cursor para a esquerda, baixo, cima e direita, respectivamente.
2. Modo de Inserção: Para inserir texto, você deve entrar no Modo de Inserção pressionando i. Para voltar ao Modo Normal, pressione Esc.
3. Modo Visual: Permite selecionar texto. Entre nesse modo pressionando v para selecionar letra a letra, ou V para selecionar linhas inteiras.
4. Modo de Comando: Usado para comandos administrativos, como salvar (:w) ou sair (:q). Para acessá-lo, pressione : enquanto estiver no Modo Normal.

#### Comandos Essenciais

Aqui estão alguns dos comandos básicos mais úteis:

##### Inserção de Texto:
`i`: Insere texto antes do cursor.
`a`: Insere após o cursor.
`o`: Abre uma nova linha abaixo e entra no Modo de Inserção.

##### Navegação e Edição:
`h`, `j`, `k`, `l`: Movem o cursor para esquerda, baixo, cima e direita.
`w`, `b`: Avança (`w`) e retrocede (`b`) palavras.
`dd`: Exclui a linha atual.
`u`: Desfaz a última alteração.

##### Navegação e Edição:
`:w`: Salva o arquivo.
`:q`: Sai do editor.
`:wq`: Salva e sai.
`:q!`: Sai sem salvar.

## Iniciando a configuração e primeiro script

As configurações do Neovim assim como as de diversos programas ficam em uma pasta chamada nvim dentro de uma pasta oculta chamada .conf onde ficam a configuração dos programas do usuário no Linux. Essa pasta em uma nova instalação ainda não existe então temos que criá-la.

```bash
# -p <path> cria o caminho inteiro - pastas e subpastas - ao invés de só uma pasta
$ mkdir -p ~/.config/nvim/
```

E agora vamos editar um arquivo chamado `init.lua` dentro dessa pasta que criamos, coloque como conteúdo desse arquivo:

```lua
print("Hello, Neovim! Hello from Lua!")
```

E se tudo der certo você deve ver a mensagem na barra de comandos assim que abrir o Neovim, assim:

![A barra de comandos do Neovim mostrando a mensagem Hello, Neovim! Hello from Lua!](/images/hello-nvim-min.png)

Parabéns, você criou sua primeira configuração com lua no Neovim! O que está acontecendo é que assim que o Neovim abre ele executa o script init.lua e exibe para nós o resultado do nosso pequeno "Hello, World!", agora vamos editar mais a fundo init.lua para começar a customizar nosso Neovim.

## Evoluindo nossa configuração

Agora vamos criar uma pasta chamada "lua" dentro de nossa pasta "nvim", todos os arquivos e pastas dentro da pasta "lua" poderão ser importados em nosso init.lua.

```bash
$ mkdir ~/.config/nvim/lua
```

Dentro dessa pasta vamos criar nosso primeiro script chamado "conf.lua" onde vamos colocar nossas configurações.

```bash
$ touch ~/config/nvim/lua/conf.lua
```

Vamos editar nosso arquivo "init.lua", na linha do nosso "Hello, World!" vamos usar o comando `dd` para recortar a linha, agora vamos aprender a navegar em arquivos sem sair do Neovim - na verdade quanto menos você fechá-lo, melhor - para isso vamos usar o comando `:Ex` que vai abrir o netrw o navegador de arquivos padrão do Neovim.

![A tela inicial do netrw mostrando uma pasta lua e um arquivo init.lua](/images/netrw-min.png)

Vamos usar h, j, k, l para navegar e <Enter> para acessar. Vamos acessar a pasta "lua" e abrir o arquivo "conf.lua" no Neovim, por fim usar o comando `p` (paste) para colar a linha que retiramos e `:w` para salvar. Temos agora que voltar para nosso arquivo "init.lua" e adicionar a importação, para isso vamos usar novamente o comando `:Ex` navegar em ".." (pasta anterior) e abrir "init.lua" e nesse arquivo vamos adicionar:

```lua
-- Isso é um comentário em lua!

-- A linha abaixo vai importar "conf.lua"
require("conf")
```

Pronto, agora podemos salvar e fechar as nossas alterações em "init.lua" com `:wq` e se quando abrirmos o Neovim novamente ainda vermos a mesma mensagem significa que está tudo funcionando.

Agora vamos adicionar algumas configurações iniciais em nosso editor, eu não vou entrar em uma a uma, mas vou deixar comentários explicando o que é e o que faz, edite "lua/conf.lua" para ter o conteúdo:

```lua
-- lua/conf.lua
-- Arquivo onde ficam as configurações gerais do editor

local opt = vim.opt

-- Ativar a numeração de linhas
opt.number = true
opt.relativenumber = true

-- Ativar a cópia e colagem com o sistema operacional
opt.clipboard = "unnamedplus"

-- Configurações de tabulação e identação
opt.tabstop = 4
opt.shiftwidth = 4
opt.expandtab = true

-- Configurações de busca
opt.ignorecase = true
opt.smartcase = true
opt.incsearch = true

-- Visibilidade e navegação
opt.cursorline = true
opt.wrap = true
opt.scrolloff = 8
opt.mouse = "a"

-- Configurações de interface
opt.termguicolors = true
opt.signcolumn = "yes"
opt.colorcolumn = "120"
opt.list = true
opt.listchars = { tab = '>~', trail = '·' }

-- Desativar arquivos de backup e swap
opt.backup = false
opt.writebackup = false
opt.swapfile = false

-- Tempo de espera para mapeamentos
opt.timeoutlen = 500
```

Você pode usar o comando `:so` (source) para aplicar as mudanças, se aparecerem linhas laterais e uma barra de marcando onde fica o limite de 120 caracteres significa que tudo está funcionando.

Agora vamos criar uma configuração para a aparência do nosso editor separada das nossas configurações de edição, para isso vamos usar o navegador de arquivos netrw `:Ex` com o comando `%` dentro da pasta lua vamos criar o arquivo "theme.lua" e editá-lo, ele deve ter o seguinte conteúdo:

```lua
-- lua/theme.lua
-- Arquivo onde ficam as configurações de aparência do editor.

-- Definir o tema padrão como "sorbet"
vim.cmd('colorscheme sorbet')

-- Configurações de cores para a linha do cursor
vim.cmd('highlight CursorLine cterm=none ctermbg=237')

-- Ativar cores verdadeiras
vim.opt.termguicolors = true

-- Exibir linha de status sempre
vim.opt.laststatus = 2

-- Ativar realce de sintaxe
vim.cmd('syntax on')
```

Agora podemos usar o comando `:w` para salvar, agora temos que navegar usando `:Ex` indo até "init.lua" para adicionar também o import do nosso arquivo "theme.lua":

```lua
require("conf")
require("theme")
```

Agora podemos salvar com `:w` e usar`:so` para carregar as configurações sem ter que reabrir o editor, se tudo der certo agora vai ser aplicado outro tema.

Por fim vamos criar um arquivo para nossos atalhos customizados (keybindings), "keys.lua" com o conteúdo:

```lua
-- lua/keys.lua
-- Arquivo onde ficam os remaps de atalhos e comandos do Neovim.

vim.g.mapleader = " "

local map = vim.api.nvim_set_keymap
local opts = { noremap = true, silent = true }

-- Parâmetros de map:
-- map(modo, combinação de teclas, comando, opções)
-- 'modo': 'n' para modo normal, 'i' para modo insert, etc.
-- 'combinação de teclas': a tecla que irá acionar o comando (ex.: '<C-h>')
-- 'comando': o comando a ser executado (ex.: '<C-w>h' para mover entre janelas)
-- 'opções': configurações adicionais como noremap (não recursivo) e silent (silencioso)

-- Facilitar a navegação entre janelas com Ctrl+h/j/k/l
map('n', '<C-h>', '<C-w>h', opts)
map('n', '<C-j>', '<C-w>j', opts)
map('n', '<C-k>', '<C-w>k', opts)
map('n', '<C-l>', '<C-w>l', opts)

-- Remapeamento para abrir e fechar o Netrw com <leader>fe
map('n', '<leader>fe', ':Ex<CR>', opts)

-- Adicione outros atalhos conforme necessário
```

E então vamos novamente editar nosso arquivo "init.lua" para importar esse arquivo:

```lua
require("conf")
require("theme")
require("keys")
```

Vamos salvar com `:w` e usar `:so` para carregar as mudanças, se tudo der certo agora podemos usar \<espaço\>-f-e (espaço seguido das teclas "f" e "e") para abrir a navegação de arquivos sem ter que digitar ":Ex", você pode mapear outras coisas que quiser como ":so" seguindo esse exemplo o que está nos comentários.

E agora pronto, se tudo estiver certo você deve ter uma configuração assim:

```tree
.
|-- init.lua
`-- lua
    |-- conf.lua
    |-- keys.lua
    `-- theme.lua
```

Com cores, atalhos personalizados e configurações de edições próprias! Agora você pode continuar mudando e extendendo essa configuração como quiser para que fique do seu jeito, o manual do VIM (comando :help) tem muitas informações sobre como configurar basicamente qualquer coisa no editor.

## Gerenciador de Plugins

Uma parte importante do Neovim é o ecossistema de plugins que nos permite instalar novas funcionalidades de forma modular no editor. Para fazer isso, diferente de editores como Sublime e VS Code que tem uma ferramenta embutida, precisamos escolher um dentre os vários gerenciadores de plugin disponíveis para o Neovim, o que considero mais moderno e bacana é o Lazy que permite escrevermos a configuração em Lua e com a configuração certa em cada plugin apenas carregas os plugins que estão em uso (de forma "Lazy" / "Lazy Loading" por isso o nome).

Para instalar o Lazy (segundo a documentação do mesmo no GitHub) apenas precisamos rodar:

```bash
$ git clone https://github.com/folke/lazy.nvim.git ~/.local/share/nvim/lazy/lazy.nvim
```

E pronto, temos ele instalado, mas precisamos configurá-lo, para isso vamos criar um arquivo "plugin.lua" em nossa pasta "lua" com o conteúdo:

```lua
-- lua/plugin.lua
-- Arquivo que contem as configurações do Gerenciador de Plugins Lazy.

local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable",
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

-- Inicializar Lazy.nvim
require("lazy").setup("plugins")
```

> Cuidado para não nomear esse arquivo como 'lazy' isso vai causar problemas porque o lazy já tem um arquivo com esse nome e vai causar problemas de dependências na sua conf, caso não queira chamar de 'plugin' chame de qualquer outra coisa que não seja 'lazy'. Também cuide que a pasta onde os arquivos vão ficar é 'plugins' e o arquivo de conf é 'plugin.lua', se você nomear ambos com o mesmo nome terá problemas também.

Agora podemos salvar a configuração com `:w`, mas antes de fazermos o source (`:so`) do arquivo precisamos criar uma pasta `lua/plugins` que é onde vai ficar a configuração de nossos plugins podemos fazer isso abrindo o netrw com \<espaço\>fe, navegando para a pasta "lua" e usando o comando "d" do netrw para criar uma pasta, será nos perguntado o nome informe "plugins" navegue para dentro dela e com o comando "%" do netrw crie um arquivo chamado "init.lua" que deve ter o conteúdo:

```lua
return {}
```

Esse arquivo será a primeira configuração importada e simplesmente vai setar uma configuração vazia para o Lazy possa inicializar, se não houver nenhuma vai haver um erro e o gerenciador não vai iniciar.

Após fazer isso temos que importar nosso arquivo "lua/lazy.lua" em nosso "init.lua" para que ele seja carregado ao abrir o Neovim, para isso vamos usar \<espaço\>fe e navegar até nosso "init.lua" editando-o para:

```lua
require("plugin")
require("conf")
require("theme")
require("keys")
```

> Observe que é importante que os plugins sejam carregados antes das suas configurações para garantir que eles estejam disponíveis para que você possa usá-los nas suas configurações e para que não sobreescrevam as suas configurações.

Pronto, agora você pode salvar (`:w`) e fazer o source (`:so`), após isso se você digitar o comando `:Lazy` e executar, caso tudo tenha dado certo deve aparecer uma tela como essa:

![A tela inicial do Lazy em branco sobreponto o código das configurações](/images/lazy-nvim-min.png)

Você pode navegar entre os menus pelas letras indicadas e usar as motions (h, j, k, l) para mover entre as opções de cada menu, você pode fechar o lazy com o comando `:q`.

## Adicionando alguns plugins

Agora que você tem o Lazy instalado e funcionando podemos começar a instalar os nossos plugins, eles nos permitem adicionar todo o tipo de funcionalidade ao nosso Neovim... suporte a linguagens de programação, LSP, temas, ... tudo que você imaginar é possível com lua e certamente o que você precisa se for algo que muitas pessoas precisam alguém já fez um plugin para o Neovim.

Para começar, vamos começar instalando o Treesitter, uma extensão que vai melhorar significativamente o sintax highlight das nossas linguagens de programação, para isso vamos criar um arquivo `lua/plugins/treesitter.lua` com o seguinte conteúdo:
```lua
return {
  {
    'nvim-treesitter/nvim-treesitter',
    build = ':TSUpdate',
    config = function()
      require('nvim-treesitter.configs').setup({
        ensure_installed = { "lua", "vim", "vimdoc", "query", "javascript", "typescript", "c" },
        sync_install = false,
        auto_install = true,
        highlight = {
          enable = true,
          additional_vim_regex_highlighting = false,
        },
      })
    end,
  },
}
```

> Observe que na chave "ensure_instaled" da tabela passada para setup tem como valores uma tabela (lista) de linguagens de programação que vão ter suporte do treesitter, mude de acordo com as linguagens que você usa.

Após salvar esse arquivo e sair/abrir novamente ou fazer source (`:so`) o Lazy vai automaticamente baixar, instalar e configurar o treesitter como está em nossa configuração sem precisarmos fazer mais nada (ele automaticamente importa todos os arquivos da pasta 'plugins' onde vamos colocar a configuração de cada um dos nossos plugins instalados). Agora se você abrir qualquer um de nossos arquivos Lua deve perceber que o autocomplete agora delimita perfeitamente cada keyword (algo que antes não era tão claro), isso vai deixar muito mais fácil de ler códigos.

Outra coisa que normalmente ajuda muito é ter um plugin de LSP, ele adiciona suporte a linguagens com coisas como autocomplete, go to definition, docs... que são muito úteis no dia a dia de desenvolvimento, vamos utilizar uma configuração pré-pronta para adicionar um gerenciador de LSPs chamado Mason que vai nos permitir instalar, desinstalar e gerenciar nossos LSPs de forma bastante facilitada. Para isso vamos criar um arquivo chamado "lua/plugins/lsp.lua" e nele vamos por o conteúdo:
```lua
return {
  {
    'VonHeikemen/lsp-zero.nvim',
    branch = 'v4.x',
    lazy = true,
    config = false,
  },
  {
    'williamboman/mason.nvim',
    lazy = false,
    config = true,
  },

  -- Autocompletion
  {
    'hrsh7th/nvim-cmp',
    event = 'InsertEnter',
    dependencies = {
      {'L3MON4D3/LuaSnip'},
    },
    config = function()
      local cmp = require('cmp')

      cmp.setup({
        sources = {
          {name = 'nvim_lsp'},
        },
        mapping = cmp.mapping.preset.insert({
          ['<C-Space>'] = cmp.mapping.complete(),
          ['<C-w>'] = cmp.mapping.scroll_docs(-4),
          ['<C-s>'] = cmp.mapping.scroll_docs(4),
          ['<C-n>'] = cmp.mapping.select_next_item(),
          ['<C-p>'] = cmp.mapping.select_prev_item(),
          ['<CR>'] = cmp.mapping.confirm({ select = true }),
          ['<Tab>'] = cmp.mapping.select_next_item(),
          ['<S-Tab>'] = cmp.mapping.select_prev_item(),
        }),
        snippet = {
          expand = function(args)
            vim.snippet.expand(args.body)
          end,
        },
      })
    end
  },

  -- LSP
  {
    'neovim/nvim-lspconfig',
    cmd = {'LspInfo', 'LspInstall', 'LspStart'},
    event = {'BufReadPre', 'BufNewFile'},
    dependencies = {
      {'hrsh7th/cmp-nvim-lsp'},
      {'williamboman/mason.nvim'},
      {'williamboman/mason-lspconfig.nvim'},
    },
    config = function()
      local lsp_zero = require('lsp-zero')

      -- lsp_attach is where you enable features that only work
      -- if there is a language server active in the file
      local lsp_attach = function(client, bufnr)
        local opts = {buffer = bufnr}

        vim.keymap.set('n', 'K', '<cmd>lua vim.lsp.buf.hover()<cr>', opts)
        vim.keymap.set('n', 'gd', '<cmd>lua vim.lsp.buf.definition()<cr>', opts)
        vim.keymap.set('n', 'gD', '<cmd>lua vim.lsp.buf.declaration()<cr>', opts)
        vim.keymap.set('n', 'gi', '<cmd>lua vim.lsp.buf.implementation()<cr>', opts)
        vim.keymap.set('n', 'go', '<cmd>lua vim.lsp.buf.type_definition()<cr>', opts)
        vim.keymap.set('n', 'gr', '<cmd>lua vim.lsp.buf.references()<cr>', opts)
        vim.keymap.set('n', 'gs', '<cmd>lua vim.lsp.buf.signature_help()<cr>', opts)
        vim.keymap.set('n', '<F2>', '<cmd>lua vim.lsp.buf.rename()<cr>', opts)
        vim.keymap.set({'n', 'x'}, '<F3>', '<cmd>lua vim.lsp.buf.format({async = true})<cr>', opts)
        vim.keymap.set('n', '<F4>', '<cmd>lua vim.lsp.buf.code_action()<cr>', opts)
      end

      lsp_zero.extend_lspconfig({
        sign_text = true,
        lsp_attach = lsp_attach,
        capabilities = require('cmp_nvim_lsp').default_capabilities()
      })

      require('mason-lspconfig').setup({
        ensure_installed = {},
        handlers = {
          -- this first function is the "default handler"
          -- it applies to every language server without a "custom handler"
          function(server_name)
            require('lspconfig')[server_name].setup({})
          end,
        }
      })
    end
  }
}
```
Após salvar (`:w`) e fechar/abrir o Neovim ou fazer source (`:so`) vai ser instalado o gerenciador de LSPs, você pode testar se ele está funcionando digitando o comando `:Mason`, se tudo deu certo deve aparecer uma tela como essa:

![A tela inicial do Mason em branco sobreponto o código de init.lua](/images/mason-nvim-min.png)

Vamos utilizá-lo para instalar nossos LSPs, com o Mason aberto use \<C-f\> (CTRL+F) para buscar o LSP da linguagem que você quer instalar, vai abrir uma lista, com os nomes das linguagens e um número que é o código dela, assim:

![Uma tela com uma lista de linguagens de programação numeradas](/images/lista-lsps-min.png)

Se você navegar até o final dela vai aparecer um prompt "Type number and \<Enter\> or click with the mouse" (como na imagem acima) para que você entre o número da linguagem na lista que você quer buscar, no caso de Lua é 101, digite "101" e enter.

Vai abrir uma lista de ferramentas como linters, lsps e code formatters para Lua que o Mason pode instalar para nós, use j/k para colocar a linha marcada sobre "lua-language-server" e use a tecla "i" para mandar o Mason instalar o LSP para Lua, agora você pode fechar o Mason com ":q" e fechar/abrir o Neovim, quando você abrir arquivos Lua agora deve ter suporte a diversas funcionalidades, entre elas code completion como na imagem abaixo:

![Um código sendo autocompletado pelo LSP](/images/lua-lsp-min.png)

Você pode navegar entre as sugestões com \<TAB\> e aceitar com \<Enter\>.

Para instalar o suporte de LSP a qualquer outra linguagem basta repetir esse processo para qualquer outra linguagem.

Seguindo esse mesmo processo de instalação de plugins você pode instalar qualquer outro que precise ou queira, alguns plugins que são populares e tem coisas que podem ser úteis para você:

\- [nvim-telescope/telescope.nvim](https://github.com/nvim-telescope/telescope.nvim): É um plugin altamente flexível e interativo para encontrar arquivos, buscas dentro do código, e navegar pela árvore de diretórios.
\- [lewis6991/gitsigns.nvim](https://github.com/lewis6991/gitsigns.nvim): Integração com Git, mostrando alterações diretamente ao lado do código, como adições, modificações e remoções.
\- [rest-nvim/rest.nvim](https://github.com/rest-nvim/rest.nvim): Permite fazer requisições HTTP diretamente do Neovim, similar ao Postman.
\- [folke/which-key.nvim](https://github.com/folke/which-key.nvim): Mostra um popup interativo com os mapeamentos disponíveis quando você começa a digitar um comando. Serve como um guia para atalhos de teclado na barra de comando.
\- [nvim-neorg/neorg](https://github.com/nvim-neorg/neorg): Um sistema de organização e tomada de notas dentro do Neovim. Serve tanto para documentar suas ideias e planejar tarefas quanto para gerenciar projetos, similar ao que o Emacs oferece com org-mode.
\- [iamcco/markdown-preview.nvim](https://github.com/iamcco/markdown-preview.nvim): Renderiza arquivos Markdown em tempo real no navegador.
\- [supermaven-inc/supermaven-nvim](https://github.com/supermaven-inc/supermaven-nvim): Integração com modelos de IA para ajudar com sugestões de código, geração de funções, e resolução de problemas.
...

Você pode encontrar muitos outros no [Awesome Neovim](https://github.com/rockerBOO/awesome-neovim), pode ir adicionando-os conforme achar necessário ou quiser, o legal do Neovim é ser um ambiente configurado para você por você.

## Bônus: Tema Dracula

Para esse tutorial eu acabei pegando um tema qualquer que vem por padrão no Neovim, mas eu particularmente gosto muito de usar o tema Dracula do Zeno Rocha. Estamos instalando um editor brasileiro que usa uma linguagem brasileira para configuração, nada mais justo colocarmos um tema brasileiro para ficar bem brazuka.

Para instalar o tema dracula vamos criar o arquivo "lua/plugins/dracula.lua" com o conteúdo:
```lua
return {
    { 
        'Mofiqul/dracula.nvim',
    },
}
```

Vamos dar um `:so` e usar o comando `:Lazy` para abrir o gerenciador e 'I' para garantir que o tema foi instalado, fechando o lazy com `:q` vamos navegar até "theme.lua" com \<espaço\>fe e nele vamos mudar o valor:

```diff
- vim.cmd('colorscheme sorbet')
+ vim.cmd('colorscheme dracula')
```

Salve (`:w`) e então faça o source (`:so`) ou saia e entre de novo para ver a mudança para o novo estilo de cores.

![Um código sendo autocompletado pelo LSP](/images/dracula-nvim-min.png)

Agora sim! Muito melhor.

## Conclusão

Depois de todas essas configurações agora você tem um Neovim organizado, moderno, preparado para desenvolvimento.

Se você seguiu esse tutorial até aqui deve ter uma estrutura como essa:

```tree
.
|-- init.lua
|-- lazy-lock.json
`-- lua
    |-- conf.lua
    |-- keys.lua
    |-- plugin.lua
    |-- plugins
    |   |-- dracula.lua
    |   |-- init.lua
    |   |-- lsp.lua
    |   `-- treesitter.lua
    `-- theme.lua
```
Que é bastante clara e organizada sobre como incluir novas configurações e plugins sem tornar tudo uma bagunça.

Espero que tenha gostado e que tenha sido útil, eu salvei o código desse exemplo [nesse repositório](https://github.com/Camilotk/neovim-conf-examplo/tree/main) caso por algum motivo precise ou queira conferi-lo pronto. Além de Neovim, eu também uso Lua para configurar meu Window Manager como explico nesse [outro post](/post/awesome_wm/) caso tenha curiosidade e queira experimentar usar Lua para isso.
