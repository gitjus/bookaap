<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'db633683845' );

/** MySQL database username */
define( 'DB_USER', 'dbo633683845' );

/** MySQL database password */
define( 'DB_PASSWORD', 'LeExMGswYiYGgdXhHj92LJEhjogjuUW' );

/** MySQL hostname */
define( 'DB_HOST', 'db633683845.db.1and1.com' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '{&lF~2rk6m~OK#RxF+)3heH@V<}y7I`onq6JdZ7^SDqA[@(r|,K@S@#T3$rQCzCh' );
define( 'SECURE_AUTH_KEY',  '#MjIF&OP}*|FtJcmA=J/DSZu_b3V:Am,z$*|^qN@on8kG`Z>Y`_AFh@WoInK}[r*' );
define( 'LOGGED_IN_KEY',    'R]a5U=IUeI573c&uw7@lF#&{>o>~Jb0kOYtj%y]6Pccb((SRuh.+?7dS^kUP6p4}' );
define( 'NONCE_KEY',        'QW ,x|a0P]/:5,8`u+>+#7=FduzOdCV9q4xNR2#@_x~%#t/U8+e?YTi)l?J-JQ]?' );
define( 'AUTH_SALT',        '62W& k=gdhc@Bu/DhZSkgC~LfVD+^J88!2$0WjBwjNv0F/:;5/(y)D9p+DBFXS.k' );
define( 'SECURE_AUTH_SALT', '1-tB=l+e!;+{,%BR?=8*GjY3YG%SDRK0o}bD%A)7:!sq=FrJ-h=U-+-~%}zW9>Q.' );
define( 'LOGGED_IN_SALT',   'm: >TX-$C`*C+f7X9!XH(@#T97TrqbCQPs_bUnA=B~Uim-;:C;Sr`{/HdsG}bc+%' );
define( 'NONCE_SALT',       '! k@UzA`I_Dl-${#;:,a[<jvgdQUde1%sx.Wn,!)_i^E:3jt(khbV9@MF-JpnPy$' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
/* ini_set('display_errors','Off');
ini_set('error_reporting', E_ALL ); */
define('WP_DEBUG', false);
define('WP_DEBUG_DISPLAY', false);

define('WP_MEMORY_LIMIT', '256M');

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );