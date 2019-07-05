"""empty message

Revision ID: 1a14077c59a9
Revises: 
Create Date: 2019-06-22 12:57:35.739497

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1a14077c59a9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('anonymous__crumbs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=20), nullable=False),
    sa.Column('crumb_type', sa.String(length=20), nullable=True),
    sa.Column('crumbName', sa.Text(), nullable=True),
    sa.Column('html', sa.Text(), nullable=True),
    sa.Column('css', sa.Text(), nullable=True),
    sa.Column('js', sa.Text(), nullable=True),
    sa.Column('htmlMeta', sa.Text(), nullable=True),
    sa.Column('cssLib', sa.Text(), nullable=True),
    sa.Column('jsLib', sa.Text(), nullable=True),
    sa.Column('htmlMode', sa.Text(), nullable=True),
    sa.Column('cssMode', sa.Text(), nullable=True),
    sa.Column('jsMode', sa.Text(), nullable=True),
    sa.Column('date_created', sa.DateTime(), nullable=True),
    sa.Column('theme', sa.String(length=30), nullable=False),
    sa.Column('f_size', sa.Integer(), nullable=False),
    sa.Column('keymap', sa.String(length=30), nullable=False),
    sa.Column('font', sa.String(length=30), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=255), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('firstname', sa.String(length=255), nullable=True),
    sa.Column('lastname', sa.String(length=255), nullable=True),
    sa.Column('location', sa.String(length=255), nullable=True),
    sa.Column('github', sa.String(length=255), nullable=True),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('image', sa.String(length=255), nullable=False),
    sa.Column('theme', sa.String(length=30), nullable=False),
    sa.Column('f_size', sa.Integer(), nullable=False),
    sa.Column('keymap', sa.String(length=30), nullable=False),
    sa.Column('font', sa.String(length=30), nullable=False),
    sa.Column('snippet', sa.Text(), nullable=True),
    sa.Column('dateCreated', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('crumbs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=20), nullable=False),
    sa.Column('crumbName', sa.Text(), nullable=True),
    sa.Column('html', sa.Text(), nullable=True),
    sa.Column('css', sa.Text(), nullable=True),
    sa.Column('js', sa.Text(), nullable=True),
    sa.Column('htmlMeta', sa.Text(), nullable=True),
    sa.Column('cssLib', sa.Text(), nullable=True),
    sa.Column('jsLib', sa.Text(), nullable=True),
    sa.Column('htmlMode', sa.Text(), nullable=True),
    sa.Column('cssMode', sa.Text(), nullable=True),
    sa.Column('jsMode', sa.Text(), nullable=True),
    sa.Column('date_created', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('crumbs')
    op.drop_table('user')
    op.drop_table('anonymous__crumbs')
    # ### end Alembic commands ###
