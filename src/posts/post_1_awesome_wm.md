---
title: "Awesome WM, meu Window Manager preferido"
date: 2024-06-15T19:39:00-03:00
layout: post.njk
---

O Awesome WM é o meu gerenciador de janelas preferido, ele é altamente configurável e dinâmico para sistemas Linux, projetado para usuários que buscam um ambiente gráfico eficiente e adaptável. Ao contrário dos gerenciadores de janelas tradicionais como o i3, o Awesome permite uma personalização extensa através de scripts em Lua, o que é muito interessante já que Lua além de ser uma linguagem leve e simples pode ser usada para qualquer tarefa de próposito geral.

### Instalando o Awesome WM

Para instalar o Awesome WM na sua distribuição Linux, você pode seguir as instruções na [documentação do site oficial](https://awesomewm.org/download/). Caso você esteja usando Debian, basta instalar através do aptitude (apt).

```bash
$ sudo apt install awesome
```

O Debian também disponibiliza um pacote chamado [awesome-extra](https://packages.debian.org/sid/awesome-extra) que contém diversos plugins e extensões do Awesome WM, como ícones de monitoramento de bateria e volume, instalação de novos plugins e outros que podem ser úteis.

### Iniciando com o Awesome WM

Depois de instalar o Awesome na sua distribuição Linux preferida, o próximo passo é logar no novo ambiente gráfico através do seu gerenciador de inicialização (display manager), como LightDM ou GDM, normalmente clicando em um botão no canto superior direito ou abaixo das credenciais de login e selecionando "Awesome WM".

Após logar pela primeira vez, você verá uma tela mais ou menos assim:
<<imagem>>

Aqui, é interessante que você aprenda alguns comandos úteis:

| Comando | O que faz? |
|---------|------------|
| Win + S | Abre um menu com todos os atalhos configurados no seu Window Manager. |
| Win + Enter | Abre um terminal. |
| Win + P | Executa um programa; é necessário digitar o nome dele e pressionar Enter. |
| Win + Shift + C | Fecha um programa. |
| Win + número | Muda para a tela número. |
| Win + Shift + número | Move o programa para a tela número. |

Com esses seis comandos básicos, você já conseguirá usar plenamente o novo ambiente. Recomendo usar a documentação no menu de ajuda (Win + S) sempre que tiver dúvidas ou esquecer um atalho; essa é uma função muito útil do Awesome que ajuda muito quem está começando com Window Managers.

### Criando o arquivo de configuração

O Awesome é configurado através de um script Lua chamado **rc.lua**. Esse script não é automaticamente criado ao instalarmos o WM, mas ele vem com uma cópia do arquivo padrão que é carregado na primeira vez que logamos e quando há algum erro no script customizado que impeça sua execução.

Precisamos encontrá-lo em nosso sistema; para isso, podemos usar comandos como **find** ou **locate** para encontrar o arquivo `rc.lua` em nosso computador.

```bash
$ find / -name rc.lua
ou
$ locate rc.lua
```

Deve aparecer que há um arquivo como `/usr/share/awesome/lib/tyrannical/example.rc.lua` ou `/etc/xdg/awesome/rc.lua` (no meu caso). Independentemente do caminho ou nome, esses são arquivos de exemplo e configuração básica do Awesome WM (ambos com o mesmo conteúdo). Podemos criar uma cópia deles para iniciar nossa primeira configuração.

A configuração do Awesome WM geralmente fica em `~/.config/awesome/rc.lua`. É provável que seu computador ainda não tenha a pasta `awesome`, então precisamos primeiro criá-la.

```bash
$ mkdir -p ~/.config/awesome
```

Então, podemos copiar a configuração base/de exemplo para lá.

```bash
$ cp /etc/xdg/awesome/rc.lua ~/.config/awesome
```

Caso não encontre esse arquivo ou precise dele e não consiga, ele também está disponível na documentação da ferramenta e pode ser consultado [aqui](https://awesomewm.org/doc/api/sample%20files/rc.lua.html). Você pode copiá-lo e usá-lo como configuração básica.

### Primeiras configurações

A primeira mudança que faço sempre é trocar o terminal padrão para o meu favorito, o Alacritty. Para isso, altero a variável `terminal` para o valor string que deve ser executado.

```lua
terminal = "alacritty"
```

Depois de alterar esse valor para o seu emulador de terminal preferido e salvar, é preciso executar o comando `Ctrl + Win + r`, que recarregará o WM aplicando as mudanças feitas. Então, é só usar `Win + Enter` e verificar se o seu terminal de escolha está abrindo no lugar do xterm.

A próxima mudança básica que faço é ajustar os padrões de "tiling" das janelas. O Awesome já vem com vários padrões instalados por padrão, diferente de outras que você precisa baixar e instalar separadamente. No entanto, ele vem com uma grande quantidade deles habilitados e uma ordem de preferência padrão. Eu pessoalmente não gosto do padrão 'floating', que deixa as janelas como em um Desktop Environment comum como Gnome ou KDE, nem costumo usar padrões como 'fair' ou 'spiral'. Para deixar apenas os padrões que uso na ordem de preferência, basta comentar os padrões que não uso e reordenar a posição dos valores no array/table `layouts`.

```lua
awful.layout.layouts = {
    awful.layout.suit.tile,
    awful.layout.suit.tile.left,
    awful.layout.suit.tile.bottom,
    awful.layout.suit.tile.top,
    awful.layout.suit.floating,
    -- awful.layout.suit.fair,
    -- awful.layout.suit.fair.horizontal,
    -- awful.layout.suit.spiral,
    -- awful.layout.suit.spiral.dwindle,
    -- awful.layout.suit.max,
    -- awful.layout.suit.max.fullscreen,
    -- awful.layout.suit.magnifier,
    -- awful.layout.suit.corner.nw,
    -- awful.layout.suit.corner.ne,
    -- awful.layout.suit.corner.sw,
    -- awful.layout.suit.corner.se,
}
```

A próxima mudança básica que faço é alterar as "TAGs" dos ambientes de trabalho (esses que mudamos com Win + número). Cada pessoa tem uma preferência diferente; algumas usam palavras como "código", "navegador", outras preferem números ou ícones SVG. Você pode mudar isso alterando a linha:

```lua
awful.tag({ "1", "2", "3", "4", "5", "6", "7", "8", "9" }, s, awful.layout.layouts[1])
```

No meu caso, normalmente só diminuo o número de TAGs porque raramente uso tantos espaços de trabalho. Basicamente, deixo apenas 5.

```lua
awful.tag({ "I", "II", "III", "IV", "V" }, s, awful.layout.layouts[1])
```

Outra coisa que gosto de fazer é adicionar alguns atalhos para os programas que mais uso. Isso também é muito pessoal, mas um programa que tenho certeza que todo mundo usa bastante é o navegador, no meu caso o Brave. Vamos criar um atalho para abrir o Brave com `Win + b`. Para isso, procure uma seção da configuração que contém diversos `awful.key`; esse é o comando para criar novos atalhos.

Ali, você notará que já existem vários atalhos criados. Todos podem ser consultados quando usa o atalho de ajuda `Win + S`. Eles estão organizados por sessão e você pode mudar isso para como preferir. Para inserir um novo comando, basta adicionar mais uma chamada para `awful.key`.

```lua
awful.key({ modkey, }, "b", function () awful.spawn("brave-browser") end,
          {description = "open a browser", group = "launcher"}),
```

Agora, salve e use o comando para recarregar o WM. Após isso, se usar `Win + b`, o navegador deve abrir.

> Dica: Sempre use **description** e **group** para especificar o que seu comando faz. Isso adiciona essa descrição no menu de ajuda `Win + S`, o que sempre ajuda a lembrar o que cada comando faz, se você mantiver isso organizado e preenchido.

Por fim, entre as coisas super básicas que mudo na minha configuração do Awesome, está remover os títulos das janelas. Eles podem ser úteis para quem está começando, mas acho que são feios e ocupam espaço. Para mudar isso, basta alterar a propriedade `titlebars_enabled` para `false`.

```lua
-- Add titlebars to normal clients and dialogs
{ rule_any = {type = { "normal", "dialog" }
  }, properties = { titlebars_enabled = false }
},
```

Depois dessas alterações, o Awesome já está pelo menos "usável". Temos nossos ambientes (tags) configurados, alguns programas preferidos nos atalhos, os padrões de tiling ajustados e nos livramos das barras de janela feias e que ocupam espaço. O próximo passo é criar nosso próprio tema para deixar o Awesome com a aparência que queremos.

### Criando o primeiro tema para o Awesome

Além do arquivo **rc.lua**, que é usado para as configurações do Awesome, geralmente também temos um arquivo **theme.lua**, onde configuramos coisas como wallpaper, cor da barra, configuração dos widgets de bateria e outros. Uma prática comum é criar o arquivo com o nome do tema, ao invés de "theme". O Awesome também tem um tema padrão que é carregado em caso de necessidade e que podemos copiar como base. Novamente, vamos usar o comando **find** ou **locate** para encontrar esse arquivo.

```bash
$ locate theme.lua
```

Esse arquivo estará em algo como `/usr/share/awesome/themes/default/theme.lua`. Podemos simplesmente copiá-lo com o nome que você quer dar para o seu tema

. Supondo que o nome desejado seja "MeuTema", copie o arquivo da seguinte forma.

```bash
$ cp /usr/share/awesome/themes/default/theme.lua ~/.config/awesome/themes/MeuTema.lua
```

Depois, precisamos alterar a linha do arquivo **rc.lua** que especifica o tema para usar o nosso novo tema.

```lua
beautiful.init(awful.util.getdir("config") .. "/themes/MeuTema.lua")
```

Agora, você pode abrir e editar o novo arquivo do tema com seu editor de texto preferido.

Para mudar a aparência da barra superior, você pode alterar propriedades como a cor de fundo e da fonte do título. A seguir, um exemplo básico de alterações de cores.

```lua
-- Define the colors
beautiful.bg_normal = "#222222"
beautiful.bg_focus = "#535d6c"
beautiful.bg_urgent = "#ff0000"
beautiful.bg_minimize = "#444444"
beautiful.bg_systray = beautiful.bg_normal
beautiful.fg_normal = "#ffffff"
beautiful.fg_focus = "#ffffff"
beautiful.fg_urgent = "#ffffff"
beautiful.fg_minimize = "#ffffff"
beautiful.border_width = 1
beautiful.border_normal = "#000000"
beautiful.border_focus = "#535d6c"
beautiful.border_marked = "#91231c"
```

Esses são apenas exemplos. Existem muitas outras configurações que você pode personalizar, como o wallpaper, fontes e ícones. Para um guia completo sobre como criar seu próprio tema, consulte a [documentação do Awesome WM](https://awesomewm.org/doc/api/) e ajuste conforme sua preferência.

Com isso, você deve ter uma configuração básica do Awesome WM com seu próprio tema. Continue ajustando e personalizando até encontrar o ambiente perfeito para suas necessidades e preferências.

