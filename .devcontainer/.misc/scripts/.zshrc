# allow variables in PROMPT
setopt prompt_subst

# disable paste highlight
unset zle_bracketed_paste

# ls colors
autoload -U compinit
compinit
export LSCOLORS=cxfxcxdxbxegedabagacad
export LS_COLORS="di=32:ln=35:so=32:pi=33:ex=31:bd=34;46:cd=34;43:su=30;41:sg=30;46:tw=30;42:ow=30;43"
zstyle ":completion:*" list-colors ${(s.:.)LS_COLORS}

# prompt syntax highlighting
ZSH_SYNTAX_HIGHLIGHTING_DIR=~/.zsh_plugins/zsh-syntax-highlighting
if ! [ -d $ZSH_SYNTAX_HIGHLIGHTING_DIR ]; then
  git clone https://github.com/zsh-users/zsh-syntax-highlighting --single-branch --branch master --depth 1 $ZSH_SYNTAX_HIGHLIGHTING_DIR
fi
source $ZSH_SYNTAX_HIGHLIGHTING_DIR/zsh-syntax-highlighting.zsh

# abbrs
ZSH_ABBR_DIR=~/.zsh_plugins/zsh-abbr
if ! [ -d $ZSH_ABBR_DIR ]; then
  git clone https://github.com/olets/zsh-abbr --single-branch --recurse-submodules --branch main --depth 1 $ZSH_ABBR_DIR
fi
source $ZSH_ABBR_DIR/zsh-abbr.zsh
abbr --session --quieter la='ls -a --color=auto'

# history
HISTSIZE=100
SAVEHIST=1000
HISTORY_IGNORE="(ls*|cat*|pwd|cd)"
setopt hist_ignore_dups
setopt hist_ignore_all_dups
setopt hist_reduce_blanks
setopt share_history
zshaddhistory() { whence ${${(z)1}[1]} >| /dev/null || return 1 }

# constants
TEXT_COLOR="#E2E2E2"
DIR_BG_COLOR="#404756"
BRANCH_BG_COLOR="#336B67"
NAME_BG_COLOR="#004997"
RIGHT_ARROW=''

function precmd() {
  if [ -z $NEW_LINE_BEFORE_PROMPT ]; then
    NEW_LINE_BEFORE_PROMPT=1
  elif [ $NEW_LINE_BEFORE_PROMPT -eq 1 ]; then
    echo ''
  fi

  branch_name=`git branch --show-current 2>/dev/null`
  repository_name=`git remote get-url origin 2>/dev/null | xargs basename -s .git 2>/dev/null`
  if [ -z $branch_name ]; then
    git_info="%F{$DIR_BG_COLOR}${RIGHT_ARROW}%f"
  else
    git_info="%F{$DIR_BG_COLOR}%K{$BRANCH_BG_COLOR}${RIGHT_ARROW}%f%F{$TEXT_COLOR} ${branch_name}@${repository_name} %f%k%F{$BRANCH_BG_COLOR}${RIGHT_ARROW}%f"
  fi
}

PROMPT='%K{$NAME_BG_COLOR}%F{$TEXT_COLOR} %n@%m %f%k%F{$NAME_BG_COLOR}%K{$DIR_BG_COLOR}${RIGHT_ARROW}%f%F{$TEXT_COLOR} %(5~|%-1~/.../%3~|%4~) %f%k$git_info
❯ '
