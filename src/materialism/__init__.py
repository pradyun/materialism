"""A Material Design theme for Sphinx (inspired by mkdocs-material)."""

__version__ = "0.1.0"

from os import path


def setup(app):
    """Entry point for sphinx theming."""
    app.add_html_theme("materialism", path.abspath(path.dirname(__file__)))
