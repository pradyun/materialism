"""A Material Design theme for Sphinx (based on mkdocs-material)."""

__version__ = "0.0.1"

from os import path


def setup(app):
    """Entry point for sphinx theming."""
    app.add_html_theme("materialism", path.abspath(path.dirname(__file__)))
