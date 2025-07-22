import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolves } from './buildResolves';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(option: BuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = option;

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
        },
        plugins: buildPlugins(option),
        module: {
            rules: buildLoaders(option),
        },
        resolve: buildResolves(option),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(option) : undefined,
    };
}
