import path from 'path';
import * as E from 'fp-ts/lib/Either';
import * as TE from 'fp-ts/lib/TaskEither';
import { build, BuildOptions } from 'esbuild';
import { exec, ExecException } from 'child_process';

const buildBookmarklet = () => {
    const options: BuildOptions = {
        minify: true,
        bundle: true,
        target: 'chrome58',
        outdir: path.join(__dirname, 'dist'),
        entryPoints: [path.join(__dirname, './src/bookmarklet.ts')],
    };

    return TE.tryCatch(
        () => build(options),
        err => err,
    );
};

const checkTsc = () => {
    return () => new Promise<E.Either<ExecException | string, string>>(resolve => {
        exec('npx tsc --noEmit', (error, stdout, stderr) => {
            if (error != null) {
                return resolve(E.left(error));
            }
            if (stderr.length > 0) {
                return resolve(E.left(stderr));
            }
            return resolve(E.right(stdout));
        });
    });
};

(async () => {
    // 面倒になった
    const r1 = await checkTsc()();
    if (E.isLeft(r1)) {
        console.error(r1);
        return;
    }
    const r2 = await buildBookmarklet()();
    if (E.isLeft(r2)) {
        console.error(r2);
    }
    console.log('ok');
})();
