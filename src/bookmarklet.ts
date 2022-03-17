// markdown の リンクテキストを作成
const createMarkdownLinkText = (title: string, url: string): string => {
    return `[${title}](${url})`;
};

// 一番単純に作成する
const createMarkdownLinkTextDefault = () => {
    return createMarkdownLinkText(document.title, document.URL);
};

// 実行する
const execute = (md: string) => {
    // Clipboard API が有効であれば、クリップボードにコピーする
    if (navigator.clipboard) {
        navigator.clipboard.writeText(md);
        return;
    }

    // Clipboard API が無効の場合はプロンプトを出してコピーできるようにしてやる
    window.prompt('Markdown below', md);
};

execute(createMarkdownLinkTextDefault());
